import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateProductFamilyMasterDto } from './dto/create-product-family-master.dto';
import { UpdateProductFamilyMasterDto } from './dto/update-product-family-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class ProductFamilyMasterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async create(
    createProductFamilyMasterDto: CreateProductFamilyMasterDto,
  ): Promise<ResponseDto> {
    try {
      await this.helperService.checkTrialLimit(
        'productFamilyMaster',
        createProductFamilyMasterDto.orgId,
        2,
      );
      const response = await this.prisma.productFamilyMaster.create({
        data: createProductFamilyMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Product Family Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productFamilyMaster.findMany();
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Family Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productFamilyMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Product Family Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Family Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateProductFamilyMasterDto: UpdateProductFamilyMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productFamilyMaster.update({
        where: { id },
        data: updateProductFamilyMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Product Family Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productFamilyMaster.delete({
        where: { id },
      });
      return {
        message: 'Product Family Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Product Family Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async findByOrgIdSbuId(
    orgId: number | null,
    sbuId: number | null,
  ): Promise<ResponseDto> {
    try {
      const whereClause = {
        ...(orgId !== 0 ? { orgId: orgId } : {}),
        ...(sbuId !== 0 ? { sbuId: sbuId } : {}),
      };
      const response = await this.prisma.productFamilyMaster.findMany({
        where: whereClause,
      });
      console.log(response, whereClause);
      if (!response) {
        return {
          message: 'Product Family Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Family Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
