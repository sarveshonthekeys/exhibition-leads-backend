import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiscountMasterDto } from './dto/create-discount-master.dto';
import { UpdateDiscountMasterDto } from './dto/update-discount-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class DiscountMasterService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createDiscountMasterDto: CreateDiscountMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.discountMaster.create({
        data: createDiscountMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Discount Code',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.discountMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Discount Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.discountMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Discount Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Discount',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateDiscountMasterDto: UpdateDiscountMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.discountMaster.update({
        where: { id },
        data: updateDiscountMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Discount  Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.discountMaster.delete({
        where: { id },
      });
      return {
        message: 'Discount Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Discount Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
