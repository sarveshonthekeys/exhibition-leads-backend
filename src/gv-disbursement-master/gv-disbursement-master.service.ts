import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateGvDisbursementMasterDto } from './dto/create-gv-disbursement-master.dto';
import { UpdateGvDisbursementMasterDto } from './dto/update-gv-disbursement-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class GvDisbursementMasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createGvDisbursementMasterDto: CreateGvDisbursementMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.gvDisbursementMaster.create({
        data: createGvDisbursementMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create GV Disbursement Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.gvDisbursementMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch GV Disbursement Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.gvDisbursementMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'GV Disbursement Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch GV Disbursement Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateGvDisbursementMasterDto: UpdateGvDisbursementMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.gvDisbursementMaster.update({
        where: { id },
        data: updateGvDisbursementMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update GV Disbursement Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.gvDisbursementMaster.delete({
        where: { id },
      });
      return {
        message: 'GV Disbursement Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete GV Disbursement Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
