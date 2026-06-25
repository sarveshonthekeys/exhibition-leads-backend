import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateIndustryTypeMasterDto } from './dto/create-industry-type-master.dto';
import { UpdateIndustryTypeMasterDto } from './dto/update-industry-type-master.dto';
import { ResponseDto } from 'src/dto/Response.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IndustryTypeMasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIndustryTypeMasterDto: CreateIndustryTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.industryTypeMaster.create({
        data: createIndustryTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Industry Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const industryTypes = await this.prisma.industryTypeMaster.findMany();
      return {
        message: industryTypes,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch industry Type Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.industryTypeMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'industry Type Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch industry Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateIndustryTypeMasterDto: UpdateIndustryTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.industryTypeMaster.update({
        where: { id },
        data: updateIndustryTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update industry Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.industryTypeMaster.delete({
        where: { id },
      });
      return {
        message: 'industry Type Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete industry Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
