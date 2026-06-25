import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateCampaignMasterDto } from './dto/create-campaign-master.dto';
import { UpdateCampaignMasterDto } from './dto/update-campaign-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class CampaignMasterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async create(
    createCampaignMasterDto: CreateCampaignMasterDto,
  ): Promise<ResponseDto> {
    try {
      await this.helperService.checkTrialLimit(
        'campaignMaster',
        createCampaignMasterDto.orgId,
        2,
      );
      const response = await this.prisma.campaignMaster.create({
        data: createCampaignMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create campaign',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch campaigns',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Campaign not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch campaign',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async findByOrg(orgId: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignMaster.findMany({
        where: { orgId },
      });

      if (!response) {
        return {
          message: 'campaign not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch campaign',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateCampaignMasterDto: UpdateCampaignMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignMaster.update({
        where: { id },
        data: updateCampaignMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update campaign',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignMaster.delete({
        where: { id },
      });
      return {
        message: 'Campaign deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete campaign',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
