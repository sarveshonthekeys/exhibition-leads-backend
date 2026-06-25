import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationTypeMasterDto } from './dto/create-organization-type-master.dto';
import { UpdateOrganizationTypeMasterDto } from './dto/update-organization-type-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class OrganizationTypeMasterService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createOrganizationTypeMasterDto: CreateOrganizationTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.organizationTypeMaster.create({
        data: createOrganizationTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Organization Type ',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.organizationTypeMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Organization Type',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.organizationTypeMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Organization Type not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Organization Type',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateOrganizationTypeMasterDto: UpdateOrganizationTypeMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.organizationTypeMaster.update({
        where: { id },
        data: updateOrganizationTypeMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Organization Type',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.organizationTypeMaster.delete({
        where: { id },
      });
      return {
        message: 'Organization Type deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Organization Type',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
