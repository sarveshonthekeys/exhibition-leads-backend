import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductsInterestedDto } from './dto/create-products-interested.dto';
import { UpdateProductsInterestedDto } from './dto/update-products-interested.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class ProductsInterestedService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductsInterestedDto: CreateProductsInterestedDto) {
    return 'This action adds a new productsInterested';
  }

  async findAll() {
    try {
      const data = await this.prisma.visitorIntProduct.findMany();
      return {
        message: data,
        statusCode: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Failed to retrieve visitor int products',
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} productsInterested`;
  }

  async update(
    id: number,
    updateProductsInterestedDto: UpdateProductsInterestedDto,
  ) {
    try {
      const response = await this.prisma.visitorIntProduct.update({
        where: { id },
        data: updateProductsInterestedDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update products interested ',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number) {
    try {
      const response = await this.prisma.visitorIntProduct.delete({
        where: { id },
      });
      return {
        message: 'Visitor Int Products deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Visitor Int Products',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async getProductsAndTotalQuantity(
    orgId: number | null,
    sbuId: number | null,
    userId: number | null,
  ): Promise<ResponseDto> {
    try {
      const whereClause = {
        ...(orgId !== 0 ? { orgId: orgId } : {}),
        ...(sbuId !== 0 && sbuId != null ? { sbuId: sbuId } : {}),
        ...(userId !== 0 && userId != null ? { userId: userId } : {}),
      };
      const products = await this.prisma.visitorIntProduct.groupBy({
        by: ['productId'],
        _sum: {
          noOfMachines: true,
        },
        where: whereClause,
      });
      const productData = await Promise.all(
        products.map(async (product) => {
          const productMaster = await this.prisma.productMaster.findUnique({
            where: { id: product.productId },
            select: { productName: true, sbuId: true },
          });
          const sbuMaster = await this.prisma.sbuMaster.findUnique({
            where: { id: productMaster.sbuId },
          });

          return {
            sbuName: sbuMaster.sbuName,
            productId: product.productId,
            productName: productMaster?.productName || 'Unknown',
            totalQuantity: product._sum.noOfMachines || 0,
          };
        }),
      );

      // const data = products.map((product) => ({
      //   productId: product.productId,
      //   totalQuantity: product._sum.noOfMachines || 0, // Handle null case
      // }));

      return {
        statusCode: HttpStatus.OK,
        message: productData,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to retrieve products',
        error: error.message,
      };
    }
  }
}
