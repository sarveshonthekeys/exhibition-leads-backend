import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateSbuMasterDto } from './dto/create-sbu-master.dto';
import { UpdateSbuMasterDto } from './dto/update-sbu-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class SbuMasterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async create(createSbuMasterDto: CreateSbuMasterDto): Promise<ResponseDto> {
    try {
      await this.helperService.checkTrialLimit(
        'sbuMaster',
        createSbuMasterDto.orgId,
        2,
      );
      const response = await this.prisma.sbuMaster.create({
        data: createSbuMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create SBU.',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.sbuMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch SBUs',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.sbuMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'SBU not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch SBU',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async findByOrg(orgId: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.sbuMaster.findMany({
        where: { orgId },
      });

      if (!response) {
        return {
          message: 'SBU not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch SBU',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateSbuMasterDto: UpdateSbuMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.sbuMaster.update({
        where: { id },
        data: updateSbuMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update SBU',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.sbuMaster.delete({
        where: { id },
      });
      return {
        message: 'SBU deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete SBU',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
