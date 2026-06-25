import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateDistrictMasterDto } from './dto/create-district-master.dto';
import { UpdateDistrictMasterDto } from './dto/update-district-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class DistrictMasterService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(
  //   createDistrictMasterDto: CreateDistrictMasterDto,
  // ): Promise<ResponseDto> {
  //   try {
  //     const response = await this.prisma.districtMaster.create({
  //       data: createDistrictMasterDto,
  //     });
  //     return {
  //       message: response,
  //       statusCode: HttpStatus.CREATED,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Failed to create District Master',
  //       error: error.message,
  //       statusCode: HttpStatus.BAD_REQUEST,
  //     };
  //   }
  // }

  async findAll(stateId?: number): Promise<ResponseDto> {
    try {
      const districts = stateId
        ? await this.prisma.districtMaster.findMany({
            where: { stateId },
          })
        : await this.prisma.districtMaster.findMany();

      return {
        message: districts,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch District Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findDistricts(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.districtMaster.findMany({
        where: { stateId: id },
      });

      if (!response) {
        return {
          message: 'District Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch District Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  // async update(
  //   id: number,
  //   updateDistrictMasterDto: UpdateDistrictMasterDto,
  // ): Promise<ResponseDto> {
  //   try {
  //     const response = await this.prisma.districtMaster.update({
  //       where: { id },
  //       data: updateDistrictMasterDto,
  //     });
  //     return {
  //       message: response,
  //       statusCode: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Failed to update District Master',
  //       error: error.message,
  //       statusCode: HttpStatus.BAD_REQUEST,
  //     };
  //   }
  // }

  // async remove(id: number): Promise<ResponseDto> {
  //   try {
  //     const response = await this.prisma.districtMaster.delete({
  //       where: { id },
  //     });
  //     return {
  //       message: 'District Master deleted successfully',
  //       statusCode: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Failed to delete District Master',
  //       error: error.message,
  //       statusCode: HttpStatus.BAD_REQUEST,
  //     };
  //   }
  // }
}
