import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateVisitorMasterDto } from './dto/create-visitor-master.dto';
import { UpdateVisitorMasterDto } from './dto/update-visitor-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { EmailService } from 'src/emailService';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class VisitorMasterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly helperService: HelperService,
  ) {}

  async create(
    createVisitorMasterDto: CreateVisitorMasterDto,
  ): Promise<ResponseDto> {
    try {
      await this.helperService.checkTrialLimit(
        'visitorMaster',
        createVisitorMasterDto.orgId,
        2,
      );
      const response = await this.prisma.visitorMaster.create({
        data: {
          orgId: createVisitorMasterDto.orgId,
          sbuId: createVisitorMasterDto.sbuId,
          userId: createVisitorMasterDto.userId,
          campaignId: createVisitorMasterDto.campaignId,
          industryTypeId: createVisitorMasterDto.industryTypeId,
          stateId: createVisitorMasterDto.stateId,
          districtId: createVisitorMasterDto.districtId,
          companyType: createVisitorMasterDto.companyType,
          companyName: createVisitorMasterDto.companyName,
          address: createVisitorMasterDto.address,
          pincode: createVisitorMasterDto.pincode,
          planningTimeline: createVisitorMasterDto.planningTimeline,
          financingReuired: createVisitorMasterDto.financingReuired,
          noOfPeopleAccompanied: createVisitorMasterDto.noOfPeopleAccompanied,
          noOfGiftsNeeded: createVisitorMasterDto.noOfGiftsNeeded,
          attachmentId: createVisitorMasterDto.attachmentId,
          noOfGifts: createVisitorMasterDto.noOfGifts,
          giftDetails: createVisitorMasterDto.giftDetails,
          productsInterested: {
            create: createVisitorMasterDto.productsInterested?.map(
              (product) => ({
                productFamilyId: product.productFamilyId,
                orgId: createVisitorMasterDto.orgId,
                sbuId: createVisitorMasterDto.sbuId,
                userId: createVisitorMasterDto.userId,
                productId: product.productId,
                visitorMasterId: product.visitorMasterId,
                modelId: product.modelId,
                noOfMachines: product.noOfMachines,
              }),
            ),
          },
          visitorDetails: {
            create: createVisitorMasterDto.visitorDetails?.map((visitor) => ({
              visitorName: visitor.visitorName,
              orgId: createVisitorMasterDto.orgId,
              sbuId: createVisitorMasterDto.sbuId,
              userId: createVisitorMasterDto.userId,
              email: visitor.email,
              mobileNo: visitor.mobileNo,
              visitorMasterId: visitor.visitorMasterId, // Assuming this is required in your schema
            })),
          },
          createdBy: createVisitorMasterDto.createdBy,
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Visitor Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.visitorMaster.findMany({
        include: {
          productsInterested: true,
          visitorDetails: true,
        },
      });
      // if (response.map((visitor)=>{
      //   if(visitor.noOfGifts && visitor.giftDetails == null){

      //   }
      // }))
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Visitor Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.visitorMaster.findUnique({
        where: { id },
        include: {
          productsInterested: true,
          visitorDetails: true,
        },
      });

      if (!response) {
        return {
          message: 'Visitor Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Visitor Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async findByOrgSbuUser(
    orgId: number | null,
    sbuId: number | null,
    userId: number | null,
  ): Promise<ResponseDto> {
    const whereClause = {
      ...(orgId !== 0 ? { orgId: orgId } : {}),
      ...(sbuId !== 0 && sbuId != null ? { sbuId: sbuId } : {}),
      ...(userId !== 0 && userId != null ? { userId: userId } : {}),
    };
    try {
      console.log(whereClause);
      const response = await this.prisma.visitorMaster.findMany({
        where: whereClause,
        include: {
          productsInterested: true,
          visitorDetails: true,
        },
      });

      if (!response) {
        return {
          message: 'Visitor Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Visitor Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(id: number, updateVisitorMasterDto: any): Promise<ResponseDto> {
    try {
      const response = await this.prisma.visitorMaster.update({
        where: { id },
        data: {
          orgId: updateVisitorMasterDto.orgId,
          sbuId: updateVisitorMasterDto.sbuId,
          userId: updateVisitorMasterDto.userId,
          campaignId: updateVisitorMasterDto.campaignId,
          industryTypeId: updateVisitorMasterDto.industryTypeId,
          stateId: updateVisitorMasterDto.stateId,
          districtId: updateVisitorMasterDto.districtId,
          companyType: updateVisitorMasterDto.companyType,
          companyName: updateVisitorMasterDto.companyName,
          address: updateVisitorMasterDto.address,
          pincode: updateVisitorMasterDto.pincode,
          planningTimeline: updateVisitorMasterDto.planningTimeline,
          financingReuired: updateVisitorMasterDto.financingReuired,
          noOfPeopleAccompanied: updateVisitorMasterDto.noOfPeopleAccompanied,
          noOfGiftsNeeded: updateVisitorMasterDto.noOfGiftsNeeded,
          attachmentId: updateVisitorMasterDto.attachmentId,
          noOfGifts: updateVisitorMasterDto.noOfGifts,
          giftDetails: updateVisitorMasterDto.giftDetails,
          productsInterested: {
            deleteMany: {},
            create: updateVisitorMasterDto.productsInterested?.map(
              (product) => ({
                productFamilyId: product.productFamilyId,
                orgId: updateVisitorMasterDto.orgId,
                sbuId: updateVisitorMasterDto.sbuId,
                userId: updateVisitorMasterDto.userId,
                productId: product.productId,
                visitorMasterId: product.visitorMasterId,
                modelId: product.modelId,
                noOfMachines: product.noOfMachines,
              }),
            ),
          },
          visitorDetails: {
            deleteMany: {},
            create: updateVisitorMasterDto.visitorDetails?.map((visitor) => ({
              visitorName: visitor.visitorName,
              orgId: updateVisitorMasterDto.orgId,
              sbuId: updateVisitorMasterDto.sbuId,
              userId: updateVisitorMasterDto.userId,
              email: visitor.email,
              mobileNo: visitor.mobileNo,
              visitorMasterId: visitor.visitorMasterId, // Assuming this is required in your schema
            })),
          },
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to Update Visitor Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async remove(id: number): Promise<ResponseDto> {
    try {
      await this.prisma.visitorIntProduct.deleteMany({
        where: { visitorMasterId: id },
      });

      await this.prisma.visitorIntProduct.deleteMany({
        where: { visitorMasterId: id },
      });

      // Then, delete the visitorMaster
      const deletedVisitor = await this.prisma.visitorMaster.delete({
        where: { id },
      });

      // const response = await this.prisma.visitorMaster.delete({
      //   where: { id },
      // });
      return {
        message: 'Visitor Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Visitor Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async generateAndSendVisitorDetailsReport(
    email: string,
    sbuId: number,
  ): Promise<string> {
    try {
      const whereClause = sbuId !== 0 ? { sbuId: sbuId } : {};

      // Fetch all visitor master data along with related productsInterested and visitorDetails
      const visitors = await this.prisma.visitorMaster.findMany({
        where: whereClause,
        include: {
          productsInterested: true, // Includes product IDs
          visitorDetails: true, // Includes visitor details
        },
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Visitor Details Report');

      // Define columns for the Excel file
      worksheet.columns = [
        { header: 'Visitor ID', key: 'visitorId', width: 10 },
        { header: 'Campaign Name', key: 'campaignName', width: 20 },
        { header: 'SBU Name', key: 'sbuName', width: 20 },
        { header: 'Company Name', key: 'companyName', width: 20 },
        { header: 'Product Family Name', key: 'productFamilyName', width: 20 },
        { header: 'Product Name', key: 'productName', width: 20 }, // Product name will be added
        { header: 'Visitor Name', key: 'visitorName', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Mobile No', key: 'mobileNo', width: 15 },
        { header: 'State', key: 'state', width: 15 },
        { header: 'District', key: 'district', width: 15 },
      ];

      // Loop through each visitor and add rows
      for (const visitor of visitors) {
        // Fetch SBU and Campaign names
        const sbu = await this.prisma.sbuMaster.findUnique({
          where: { id: visitor.sbuId },
        });
        const campaign = await this.prisma.campaignMaster.findUnique({
          where: { id: visitor.campaignId },
        });
        const state = await this.prisma.stateMaster.findUnique({
          where: { id: visitor.stateId },
        });
        const district = await this.prisma.districtMaster.findUnique({
          where: { id: visitor.districtId },
        });

        const sbuName = sbu ? sbu.sbuName : 'N/A';
        const campaignName = campaign ? campaign.campaignName : 'N/A';
        const stateName = state ? state.name : 'N/A';
        const districtName = district ? district.name : 'N/A';

        // Map product names from the product table using product IDs
        for (const productInterested of visitor.productsInterested) {
          const productFamily =
            await this.prisma.productFamilyMaster.findUnique({
              where: { id: productInterested.productFamilyId }, // Fetch product by its ID
            });
          const product = await this.prisma.productMaster.findUnique({
            where: { id: productInterested.productId }, // Fetch product by its ID
          });

          const productName = product ? product.productName : 'N/A';
          const productFamilyName = productFamily
            ? productFamily.productFamilyName
            : 'N/A';

          // Add a row to the worksheet
          worksheet.addRow({
            visitorId: visitor.id,
            companyName: visitor.companyName,
            sbuName: sbuName,
            campaignName: campaignName,
            productName: productName, // Use fetched product name
            visitorName: visitor.visitorDetails[0]?.visitorName || 'N/A',
            email: visitor.visitorDetails[0]?.email || 'N/A',
            mobileNo: visitor.visitorDetails[0]?.mobileNo || 'N/A',
            district: districtName,
            state: stateName,
            productFamilyName: productFamilyName,
          });
        }

        // If no products are interested, add a default row
        if (visitor.productsInterested.length === 0) {
          worksheet.addRow({
            visitorId: visitor.id,
            companyName: visitor.companyName,
            sbuName: sbuName,
            campaignName: campaignName,
            productName: 'N/A',
            visitorName: visitor.visitorDetails[0]?.visitorName || 'N/A',
            email: visitor.visitorDetails[0]?.email || 'N/A',
            mobileNo: visitor.visitorDetails[0]?.mobileNo || 'N/A',
            district: districtName,
            state: stateName,
            productFamilyName: 'N/A',
          });
        }
      }

      // Correct file path generation
      const filePath = path.resolve('./visitor_details_report.xlsx');

      // Write the Excel file
      await workbook.xlsx.writeFile(filePath);

      // Send the generated report via email
      await this.emailService.sendEmail(
        email,
        'Visitor Details Report',
        'Please find the attached visitor report.',
        filePath,
        'visitor-details-report.xlsx',
      );

      return filePath; // Return the file path if needed
    } catch (error) {
      throw new Error(`Failed to generate or send report: ${error.message}`);
    }
  }
  async generateAndSendVisitorReport(
    email: string,
    sbuId: number,
  ): Promise<string> {
    try {
      const whereClause = sbuId !== 0 ? { sbuId: sbuId } : {};

      // Fetch all visitor master data along with related productsInterested and visitorDetails
      const visitors = await this.prisma.visitorMaster.findMany({
        where: whereClause,
        // include: {
        //   productsInterested: true, // Includes product IDs
        //   visitorDetails: true, // Includes visitor details
        // },
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Visitor Report');

      // Define columns for the Excel file
      worksheet.columns = [
        { header: 'Visitor ID', key: 'visitorId', width: 10 },
        { header: 'SBU Name', key: 'sbuName', width: 20 },
        { header: 'Campaign Name', key: 'campaignName', width: 20 },
        { header: 'Company Type', key: 'compantType', width: 20 },
        { header: 'Company Name', key: 'companyName', width: 20 },
        { header: 'Planning Time', key: 'planningTime', width: 20 },
        { header: 'Finance Required', key: 'financeRequired', width: 20 },
        { header: 'Address', key: 'address', width: 20 },
        { header: 'Pincode', key: 'pincode', width: 20 }, // Product name will be added
        { header: 'State', key: 'state', width: 15 },
        { header: 'District', key: 'district', width: 15 },
      ];

      // Loop through each visitor and add rows
      for (const visitor of visitors) {
        // Fetch SBU and Campaign names
        const sbu = await this.prisma.sbuMaster.findUnique({
          where: { id: visitor.sbuId },
        });
        const companyType = await this.prisma.companyTypeMaster.findUnique({
          where: { id: visitor.companyType },
        });
        const campaign = await this.prisma.campaignMaster.findUnique({
          where: { id: visitor.campaignId },
        });
        const state = await this.prisma.stateMaster.findUnique({
          where: { id: visitor.stateId },
        });
        const district = await this.prisma.districtMaster.findUnique({
          where: { id: visitor.districtId },
        });

        const sbuName = sbu ? sbu.sbuName : 'N/A';
        const campaignName = campaign ? campaign.campaignName : 'N/A';
        const stateName = state ? state.name : 'N/A';
        const districtName = district ? district.name : 'N/A';

        worksheet.addRow({
          visitorId: visitor.id,
          sbuName: sbuName,
          campaignName: campaignName,
          companyType: companyType,
          companyName: visitor.companyName,
          planningTime: visitor.planningTimeline,
          financeRequired: visitor.financingReuired,
          address: visitor.address,
          pincode: visitor.pincode,
          district: districtName,
          state: stateName,
        });

        // Map product names from the product table using product IDs
        // for (const productInterested of visitor.productsInterested) {
        //   const productFamily =
        //     await this.prisma.productFamilyMaster.findUnique({
        //       where: { id: productInterested.productFamilyId }, // Fetch product by its ID
        //     });
        //   const product = await this.prisma.productMaster.findUnique({
        //     where: { id: productInterested.productId }, // Fetch product by its ID
        //   });

        //   const productName = product ? product.productName : 'N/A';
        //   const productFamilyName = productFamily
        //     ? productFamily.productFamilyName
        //     : 'N/A';

        //   // Add a row to the worksheet

        // }

        // If no products are interested, add a default row
        // if (visitor.productsInterested.length === 0) {
        //   worksheet.addRow({
        //     visitorId: visitor.id,
        //     companyName: visitor.companyName,
        //     sbuName: sbuName,
        //     campaignName: campaignName,
        //     productName: 'N/A',
        //     visitorName: visitor.visitorDetails[0]?.visitorName || 'N/A',
        //     email: visitor.visitorDetails[0]?.email || 'N/A',
        //     mobileNo: visitor.visitorDetails[0]?.mobileNo || 'N/A',
        //     district: districtName,
        //     state: stateName,
        //     productFamilyName: 'N/A',
        //   });
        // }
      }

      // Correct file path generation
      const filePath = path.resolve('./visitor_report.xlsx');

      // Write the Excel file
      await workbook.xlsx.writeFile(filePath);

      // Send the generated report via email
      await this.emailService.sendEmail(
        email,
        'Please find the attached visitor report.',
        'Visitor Report',
        filePath,
        'visitor-report.xlsx',
      );

      return filePath; // Return the file path if needed
    } catch (error) {
      throw new Error(`Failed to generate or send report: ${error.message}`);
    }
  }
  async getVisitorDetailsCount(
    orgId: number | null,
    sbuId: number | null,
    userId: number | null,
  ): Promise<number> {
    const whereClause = {
      ...(orgId !== 0 ? { orgId: orgId } : {}),
      ...(sbuId !== 0 && sbuId != null ? { sbuId: sbuId } : {}),
      ...(userId !== 0 && userId != null ? { userId: userId } : {}),
    };
    // Filter based on sbuId if provided

    const count = await this.prisma.visitorDetails.count({
      where: whereClause,
    });

    return count; // Return the count of visitor details
  }
  async getVisitorCount(
    orgId: number | null,
    sbuId: number | null,
    userId: number | null,
  ): Promise<number> {
    const whereClause = {
      ...(orgId !== 0 ? { orgId: orgId } : {}),
      ...(sbuId !== 0 && sbuId != null ? { sbuId: sbuId } : {}),
      ...(userId !== 0 && userId != null ? { userId: userId } : {}),
    };
    console.log(whereClause);
    const show = await this.prisma.visitorMaster.findMany({
      where: whereClause,
    });
    console.log(show);
    const count = await this.prisma.visitorMaster.count({
      where: whereClause,
    });

    return count; // Return the count of visitor details
  }
}
