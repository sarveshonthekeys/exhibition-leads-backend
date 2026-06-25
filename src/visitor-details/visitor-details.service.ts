import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVisitorDetailDto } from './dto/create-visitor-detail.dto';
import { UpdateVisitorDetailDto } from './dto/update-visitor-detail.dto';
import { ResponseDto } from 'src/dto/Response.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VisitorDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVisitorDetailDto: CreateVisitorDetailDto) {
    return 'This action adds a new visitorDetail';
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const data = await this.prisma.visitorDetails.findMany();
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve visitor details',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} visitorDetail`;
  }

  async update(id: number, updateVisitorDetailDto: UpdateVisitorDetailDto) {
    try {
      const response = await this.prisma.visitorDetails.update({
        where: { id },
        data: updateVisitorDetailDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update visitor details  ',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number) {
    try {
      const response = await this.prisma.visitorDetails.delete({
        where: { id },
      });
      return {
        message: 'Visitor details deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Visitor details',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
