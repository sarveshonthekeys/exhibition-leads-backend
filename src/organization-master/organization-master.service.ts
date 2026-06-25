import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationMasterDto } from './dto/create-organization-master.dto';
import { UpdateOrganizationMasterDto } from './dto/update-organization-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import { addDays, differenceInDays, format } from 'date-fns';

@Injectable()
export class OrganizationMasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createOrganizationMasterDto: CreateOrganizationMasterDto,
  ): Promise<ResponseDto> {
    //return 'This action adds a new organizationMaster';
    try {
      const data = await this.prisma.organizationMaster.create({
        data: createOrganizationMasterDto,
      });
      return {
        message: data,
        statusCode: HttpStatus.CREATED,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failed to create organization',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }
  async createOrgAndUser(createOrganizationAndUserDto): Promise<ResponseDto> {
    //return 'This action adds a new organizationMaster';
    try {
      console.log('asdasd', createOrganizationAndUserDto);
      if (createOrganizationAndUserDto.password) {
        console.log(createOrganizationAndUserDto);
        try {
          const org = await this.prisma.organizationMaster.create({
            data: {
              orgName: createOrganizationAndUserDto.orgName,
              orgTypeId: createOrganizationAndUserDto.orgTypeId,
              address: createOrganizationAndUserDto.address,
              pincode: createOrganizationAndUserDto.pincode,
              orgEmail: createOrganizationAndUserDto.orgEmail,
              orgMobileNo: createOrganizationAndUserDto.orgMobileNo,
              orgContactName: createOrganizationAndUserDto.orgContactName,
            },
          });
          if (org.id) {
            try {
              const user = await this.prisma.userMaster.create({
                data: {
                  orgId: org.id,
                  username: createOrganizationAndUserDto.orgContactName,
                  email: createOrganizationAndUserDto.orgEmail,
                  password: createOrganizationAndUserDto.password,
                  mobile: createOrganizationAndUserDto.orgMobileNo,
                  address: createOrganizationAndUserDto.address,
                  pincode: createOrganizationAndUserDto.pincode,
                  roleId: 1,
                  status: true,
                },
              });
              try {
                const plan = await this.prisma.planMaster.findUnique({
                  where: { id: 2 },
                });
                const startDate = format(new Date(), 'yyyy-MM-dd');
                const endDate = format(
                  addDays(startDate, plan.validityInDays),
                  'yyyy-MM-dd',
                );
                const sub = await this.prisma.subscriptionMaster.create({
                  data: {
                    orgId: org.id,
                    userId: user.id,
                    planId: 2,
                    startDate: startDate,
                    endDate: endDate,
                    transactionStatus: true,
                    transactionReference: 'trailpack',
                    noOfDaysPending: differenceInDays(
                      endDate,
                      startDate,
                    ).toString(),
                    isActive: true,
                    status: true,
                  },
                });
                return {
                  message: user,
                  statusCode: HttpStatus.CREATED,
                };
              } catch (error) {
                return {
                  message: 'Failed to create subscription',
                  statusCode: HttpStatus.BAD_REQUEST,
                  error: error.message,
                };
              }
            } catch (error) {
              return {
                message: 'Failed to create user',
                statusCode: HttpStatus.BAD_REQUEST,
                error: error.message,
              };
            }
          }
        } catch (error) {
          return {
            message: 'Failed to create organization',
            statusCode: HttpStatus.BAD_REQUEST,
            error: error.message,
          };
        }
      } else {
        return {
          message: 'Failed to create organization and user',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {}
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.prisma.organizationMaster.findMany();
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve organizations',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const data = await this.prisma.organizationMaster.findUnique({
        where: { id },
      });
      if (!data) {
        return {
          message: `Organization with ID ${id} not found`,
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
        message: `Failed to retrieve organization with ID ${id}`,
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async update(
    id: number,
    updateOrganizationMasterDto: UpdateOrganizationMasterDto,
  ): Promise<ResponseDto> {
    try {
      const data = await this.prisma.organizationMaster.update({
        where: { id },
        data: updateOrganizationMasterDto,
      });
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: `Failed to update organization with ID ${id}`,
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      await this.prisma.organizationMaster.delete({
        where: { id },
      });
      return {
        message: 'Organization deleted successfully',
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: `Failed to delete organization with ID ${id}`,
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }
}
