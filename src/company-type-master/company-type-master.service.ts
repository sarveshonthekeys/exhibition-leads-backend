import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyTypeMasterDto } from './dto/create-company-type-master.dto';
import { UpdateCompanyTypeMasterDto } from './dto/update-company-type-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class CompanyTypeMasterService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createCompanyTypeMasterDto: CreateCompanyTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.companyTypeMaster.create({
        data: createCompanyTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Company Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const companyTypes = await this.prisma.companyTypeMaster.findMany();
      return {
        message: companyTypes,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Company Type Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.companyTypeMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Company Type Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Company Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateCompanyTypeMasterDto: UpdateCompanyTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.companyTypeMaster.update({
        where: { id },
        data: updateCompanyTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Company Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.companyTypeMaster.delete({
        where: { id },
      });
      return {
        message: 'company Type Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete company Type Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
