import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateProductMasterDto } from './dto/create-product-master.dto';
import { UpdateProductMasterDto } from './dto/update-product-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class ProductMasterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async create(
    createProductMasterDto: CreateProductMasterDto,
  ): Promise<ResponseDto> {
    try {
      await this.helperService.checkTrialLimit(
        'productMaster',
        createProductMasterDto.orgId,
        2,
      );
      const response = await this.prisma.productMaster.create({
        data: {
          orgId: createProductMasterDto.orgId,
          sbuId: createProductMasterDto.sbuId,
          productFamilyId: createProductMasterDto.productFamilyId,
          productCode: createProductMasterDto.productCode,
          productName: createProductMasterDto.productName,
          productDescription: createProductMasterDto.productDescription,
          model: {
            create: createProductMasterDto.model?.map((model) => ({
              modelName: model.modelName,
            })),
          },
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Product Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productMaster.findMany({
        include: {
          model: true,
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findByOrgIdSbuIdProFamilyId(
    orgId: number | null,
    sbuId: number | null,
    productFamilyId: number | null,
  ): Promise<ResponseDto> {
    try {
      const whereClause = {
        ...(orgId !== 0 ? { orgId: orgId } : {}),
        ...(sbuId !== 0 ? { sbuId: sbuId } : {}),
        ...(productFamilyId !== 0 ? { productFamilyId: productFamilyId } : {}),
      };
      console.log(whereClause);
      const response = await this.prisma.productMaster.findMany({
        where: whereClause,
      });

      if (!response) {
        return {
          message: 'Product Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productMaster.findUnique({
        where: { id },
        include: {
          model: true,
        },
      });

      if (!response) {
        return {
          message: 'Product Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Product Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateProductMasterDto: UpdateProductMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productMaster.update({
        where: { id },
        data: {
          ...updateProductMasterDto,
          model: updateProductMasterDto.model
            ? {
                deleteMany: {}, // Clear existing models
                create: updateProductMasterDto.model.map((model) => ({
                  modelName: model.modelName,
                })),
              }
            : undefined,
        },
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Product Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.productMaster.delete({
        where: { id },
        include: {
          model: true,
        },
      });
      return {
        message: 'Product Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Product Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
