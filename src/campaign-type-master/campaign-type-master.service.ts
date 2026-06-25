import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateCampaignTypeMasterDto } from './dto/create-campaign-type-master.dto';
import { UpdateCampaignTypeMasterDto } from './dto/update-campaign-type-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class CampaignTypeMasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCampaignTypeMasterDto: CreateCampaignTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignTypeMaster.create({
        data: createCampaignTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Campaign Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const campaignTypes = await this.prisma.campaignTypeMaster.findMany();
      return {
        message: campaignTypes,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Campaign Type Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignTypeMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Campaign Type Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Campaign Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateCampaignTypeMasterDto: UpdateCampaignTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignTypeMaster.update({
        where: { id },
        data: updateCampaignTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Campaign Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.campaignTypeMaster.delete({
        where: { id },
      });
      return {
        message: 'Campaign Type Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Campaign Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
