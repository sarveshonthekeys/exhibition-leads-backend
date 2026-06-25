import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserMasterDto } from './dto/create-user-master.dto';
import { UpdateUserMasterDto } from './dto/update-user-master.dto';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as nodemailer from 'nodemailer';
import { ResponseDto } from 'src/dto/Response.dto';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { EmailService } from 'src/emailService';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class UserMasterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly helperService: HelperService,
  ) {}

  private otps = new Map<string, { otp: string; expiry: Date }>();
  private transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    service: 'outlook',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async create(createUserMasterDto: CreateUserMasterDto): Promise<ResponseDto> {
    try {
      try {
        await this.helperService.checkTrialLimit(
          'userMaster',
          createUserMasterDto.orgId,
          2,
        );
      } catch (error) {
        return {
          message: 'Failed to validate subscription',
          statusCode: HttpStatus.BAD_REQUEST,
          error: error.message,
        };
      }

      const data = await this.prisma.userMaster.create({
        data: createUserMasterDto,
      });
      return {
        message: data,
        statusCode: HttpStatus.CREATED,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failed to create user',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.prisma.userMaster.findMany({});
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve users',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const data = await this.prisma.userMaster.findUnique({
        where: { id },
      });
      if (!data) {
        return {
          message: `User with ID ${id} not found`,
          statusCode: HttpStatus.NOT_FOUND,
          error: null,
        };
      }
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: `Failed to retrieve user with ID ${id}`,
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }
  async findByOrg(orgId: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.userMaster.findMany({
        where: { orgId },
      });

      if (!response) {
        return {
          message: 'User not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch User',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateUserMasterDto: UpdateUserMasterDto,
  ): Promise<ResponseDto> {
    try {
      const data = await this.prisma.userMaster.update({
        where: { id },
        data: updateUserMasterDto,
      });
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: `Failed to update user with ID ${id}`,
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      await this.prisma.userMaster.delete({
        where: { id },
      });
      return {
        message: 'User deleted successfully',
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: `Failed to delete user with ID ${id}`,
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async sendOtp(email: string): Promise<ResponseDto> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);

    this.otps.set(email, { otp, expiry });

    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      });
      return {
        message: 'OTP sent to your email',
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failure in sending email',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async validateOtp(
    email: string,
    otp: string,
    androidVersion: string,
    iosVersion: string,
    platform: string,
  ): Promise<ResponseDto> {
    const otpDetails = this.otps.get(email);

    if (!otpDetails) {
      return {
        message: 'OTP not found',
        statusCode: HttpStatus.BAD_REQUEST,
        error: null,
      };
    }

    const { otp: validOtp, expiry } = otpDetails;

    if (otp !== validOtp) {
      return {
        message: 'Invalid OTP',
        statusCode: HttpStatus.BAD_REQUEST,
        error: null,
      };
    }

    if (new Date() > expiry) {
      return {
        message: 'OTP expired',
        statusCode: HttpStatus.BAD_REQUEST,
        error: null,
      };
    }
    const platformLocal = platform.toUpperCase();
    const version = await this.prisma.versionMaster.findUnique({
      where: { platform: platformLocal },
    });
    if (platform.toUpperCase() == 'IOS') {
      if (version.latestVersion == iosVersion) {
        const user = await this.prisma.userMaster.findUnique({
          where: { email: email },
        });
        const organizationName =
          await this.prisma.organizationMaster.findUnique({
            where: { id: user.orgId },
          });
        const menuAssignments = await this.prisma.menuAssigned.findMany({
          where: { roleMasterId: user.roleId },
        });
        const menus = menuAssignments.map((assignment) => assignment.menuName);
        this.otps.delete(email);

        const subWhereClause = { orgId: user.orgId, status: true };
        const subscription = await this.prisma.subscriptionMaster.findFirst({
          where: subWhereClause,
          orderBy: { endDate: 'desc' },
        });
        if (subscription) {
          return {
            message: {
              user,
              menus,
              subscription: true,
            },
            statusCode: HttpStatus.OK,
            error: null,
          };
        } else {
          const menus = ['Subscription'];
          return {
            message: {
              message: 'VALIDITY EXPIRED',
              user,
              menus,
              subscription: false,
            },
            statusCode: HttpStatus.OK,
            error: null,
          };
        }
      } else {
        return {
          message: 'Outdated Version! Update for the best experience.',
          statusCode: HttpStatus.CONFLICT,
          error: null,
        };
      }
    } else if (platform.toUpperCase() == 'ANDROID') {
      if (version.latestVersion == androidVersion) {
        const user = await this.prisma.userMaster.findUnique({
          where: { email: email },
        });
        const menuAssignments = await this.prisma.menuAssigned.findMany({
          where: { roleMasterId: user.roleId },
        });
        const menus = menuAssignments.map((assignment) => assignment.menuName);
        this.otps.delete(email);
        const subWhereClause = { orgId: user.orgId, status: true };
        const subscription = await this.prisma.subscriptionMaster.findFirst({
          where: subWhereClause,
          orderBy: { endDate: 'desc' },
        });
        if (subscription) {
          return {
            message: {
              user,
              menus,
              subscription: true,
            },
            statusCode: HttpStatus.OK,
            error: null,
          };
        } else {
          const menus = ['Subscription'];
          return {
            message: {
              message: 'VALIDITY EXPIRED',
              user,
              menus,
              subscription: false,
            },
            statusCode: HttpStatus.OK,
            error: null,
          };
        }
      } else {
        return {
          message: 'Outdated Version! Update for the best experience.',
          statusCode: HttpStatus.CONFLICT,
          error: null,
        };
      }
    } else {
      return {
        message: 'No Matching Platform found',
        statusCode: HttpStatus.CONFLICT,
        error: null,
      };
    }
  }

  async login(loginDto: LoginDto): Promise<ResponseDto> {
    const { email, password, androidVersion, iosVersion, platform } = loginDto;
    const platformLocal = platform.toUpperCase();
    const validPlatforms = ['ANDROID', 'IOS'];

    try {
      const userRes = await this.prisma.userMaster.findUnique({
        where: { email: email },
      });
      //console.log('user in login', user);
      if (!userRes || userRes.password !== password) {
        return {
          message: 'Invalid credentials',
          statusCode: HttpStatus.UNAUTHORIZED,
          error: null,
        };
      } else if (userRes.status) {
        //onsole.log(platformLocal);
        const version = await this.prisma.versionMaster.findUnique({
          where: { platform: platformLocal },
        });

        const menuAssignments = await this.prisma.menuAssigned.findMany({
          where: { roleMasterId: userRes.roleId },
        });
        const menus = menuAssignments.map((assignment) => assignment.menuName);
        const organizationName =
          await this.prisma.organizationMaster.findUnique({
            where: { id: userRes.orgId },
          });

        const subWhereClause = { orgId: userRes.orgId, isActive: true };
        const subscription = await this.prisma.subscriptionMaster.findFirst({
          where: subWhereClause,
          orderBy: { endDate: 'desc' },
        });
        const user = { ...userRes, orgName: organizationName.orgName };

        //console.log(version, platform);
        if (
          platform.toUpperCase() === 'ANDROID' ||
          platform.toUpperCase() === 'IOS'
        ) {
          if (
            version.latestVersion == androidVersion &&
            version.latestVersion == iosVersion
          ) {
            if (subscription) {
              return {
                message: {
                  user,
                  menus,
                  subscription: true,
                },
                statusCode: HttpStatus.OK,
                error: null,
              };
            } else {
              const menus = ['Subscription'];
              return {
                message: {
                  message: 'VALIDITY EXPIRED',
                  user,
                  menus,
                  subscription: false,
                },
                statusCode: HttpStatus.OK,
                error: null,
              };
            }
          } else {
            return {
              message: 'Outdated Version! Update for the best experience.',
              statusCode: HttpStatus.CONFLICT,
              error: null,
            };
          }
        }
        //  else if (platform.toUpperCase() === 'IOS') {
        //   if (version.latestVersion == iosVersion) {
        //     if (subscription) {
        //       return {
        //         message: {
        //           userRes,
        //           menus,
        //           subscription: true,
        //         },
        //         statusCode: HttpStatus.OK,
        //         error: null,
        //       };
        //     } else {
        //       const menus = ['Subscription'];
        //       return {
        //         message: {
        //           message: 'VALIDITY EXPIRED',
        //           userRes,
        //           menus,
        //           subscription: false,
        //         },
        //         statusCode: HttpStatus.BAD_REQUEST,
        //         error: null,
        //       };
        //     }
        //   } else {
        //     return {
        //       message: 'Outdated Version! Update for the best experience.',
        //       statusCode: HttpStatus.CONFLICT,
        //       error: null,
        //     };
        //   }
        // }
        else {
          return {
            message: `No Matching Platform found`,
            statusCode: HttpStatus.CONFLICT,
            error: null,
          };
        }
      } else {
        return {
          message: 'User is not active',
          statusCode: HttpStatus.BAD_REQUEST,
          error: null,
        };
      }
    } catch (error) {
      return {
        message: 'Failed to log in',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async checkUserExist(loginDto: LoginDto): Promise<ResponseDto> {
    const { email } = loginDto;

    try {
      const user = await this.prisma.userMaster.findUnique({
        where: { email: email },
      });
      console.log(user);
      if (!user) {
        return {
          message: 'User does not exist',
          statusCode: HttpStatus.NOT_FOUND,
          error: null,
        };
      } else {
        if (user.status) {
          return {
            message: user,
            statusCode: HttpStatus.OK,
            error: null,
          };
        } else {
          return {
            message: 'User is not active',
            statusCode: HttpStatus.BAD_REQUEST,
            error: null,
          };
        }
      }
    } catch (error) {
      return {
        message: 'Failed to check user existence',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async generateAndSendUserReport(
    email: string,
    sbuId: number,
  ): Promise<string> {
    try {
      const whereClause = sbuId !== 0 ? { sbuId: sbuId } : {};

      // Fetch all visitor master data along with related productsInterested and visitorDetails
      const users = await this.prisma.userMaster.findMany({
        where: whereClause,
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('User Report');

      // Define columns for the Excel file
      worksheet.columns = [
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'SBU Name', key: 'sbuName', width: 20 },
        { header: 'Campaign Name', key: 'campaignName', width: 20 },
        { header: 'Username', key: 'username', width: 20 },
        { header: 'Email', key: 'email', width: 20 },
        { header: 'Mobile', key: 'mobile', width: 20 },
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Address', key: 'address', width: 20 },
        { header: 'Pincode', key: 'pincode', width: 20 }, // Product name will be added
      ];

      // Loop through each visitor and add rows
      for (const user of users) {
        // Fetch SBU and Campaign names
        const sbu = await this.prisma.sbuMaster.findUnique({
          where: { id: user.sbuId },
        });

        let campaign = null;
        if (user.campaignId) {
          campaign = await this.prisma.campaignMaster.findUnique({
            where: { id: user.campaignId },
          });
        }

        const role = await this.prisma.roleMaster.findUnique({
          where: { id: user.roleId },
        });

        const sbuName = sbu ? sbu.sbuName : 'N/A';
        const campaignName = campaign ? campaign.campaignName : 'N/A';
        const roleName = role ? role.roleName : 'N/A';

        worksheet.addRow({
          userId: user.id,
          sbuName: sbuName,
          campaignName: campaignName,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          role: roleName,
          address: user.address,
          pincode: user.pincode,
        });
      }

      // Correct file path generation
      const filePath = path.resolve('./user.xlsx');

      // Write the Excel file
      await workbook.xlsx.writeFile(filePath);

      // Send the generated report via email
      await this.emailService.sendEmail(
        email,
        'Please find the attached user report.',
        'User Report',
        filePath,
        'user-report.xlsx',
      );

      return filePath; // Return the file path if needed
    } catch (error) {
      throw new Error(`Failed to generate or send report: ${error.message}`);
    }
  }

  async getUserByStatus(status: boolean): Promise<ResponseDto> {
    try {
      const response = await this.prisma.userMaster.findMany({
        where: { status },
      });

      if (!response) {
        return {
          message: 'User Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch User Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
