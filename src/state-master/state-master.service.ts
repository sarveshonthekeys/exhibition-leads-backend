import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateStateMasterDto } from './dto/create-state-master.dto';
import { UpdateStateMasterDto } from './dto/update-state-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class StateMasterService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(
  //   createStateMasterDto: CreateStateMasterDto,
  // ): Promise<ResponseDto> {
  //   try {
  //     const response = await this.prisma.stateMaster.create({
  //       data: createStateMasterDto,
  //     });
  //     return {
  //       message: response,
  //       statusCode: HttpStatus.CREATED,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Failed to create State Master',
  //       error: error.message,
  //       statusCode: HttpStatus.BAD_REQUEST,
  //     };
  //   }
  // }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.stateMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch State Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.stateMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'State Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch State Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  // async update(
  //   id: number,
  //   updateStateMasterDto: UpdateStateMasterDto,
  // ): Promise<ResponseDto> {
  //   try {
  //     const response = await this.prisma.stateMaster.update({
  //       where: { id },
  //       data: updateStateMasterDto,
  //     });
  //     return {
  //       message: response,
  //       statusCode: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Failed to update State Master',
  //       error: error.message,
  //       statusCode: HttpStatus.BAD_REQUEST,
  //     };
  //   }
  // }

  // async remove(id: number): Promise<ResponseDto> {
  //   try {
  //     const response = await this.prisma.stateMaster.delete({
  //       where: { id },
  //     });
  //     return {
  //       message: 'State Master deleted successfully',
  //       statusCode: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Failed to delete State Master',
  //       error: error.message,
  //       statusCode: HttpStatus.BAD_REQUEST,
  //     };
  //   }
  // }
}
