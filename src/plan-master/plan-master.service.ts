import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanMasterDto } from './dto/create-plan-master.dto';
import { UpdatePlanMasterDto } from './dto/update-plan-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';

@Injectable()
export class PlanMasterService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPlanMasterDto: CreatePlanMasterDto): Promise<ResponseDto> {
    try {
      const response = await this.prisma.planMaster.create({
        data: createPlanMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: 'Failed to create Plan Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const plans = await this.prisma.planMaster.findMany();
      return {
        message: plans,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Plan Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.planMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Plan Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Plan Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async getDiscountValue(
    planId: number,
    couponCode: string,
  ): Promise<ResponseDto> {
    try {
      console.log(planId);
      const response = await this.prisma.planMaster.findUnique({
        where: { id: planId },
      });
      console.log(response);
      if (response) {
        if (couponCode) {
          console.log(couponCode);
          const discount = await this.prisma.discountMaster.findUnique({
            where: { discountCouponCode: couponCode },
          });
          if (discount) {
            const discountAmount =
              (response.price * discount.discountValueInPercent) / 100;
            const discountedPrice = response.price - discountAmount;
            return {
              message: {
                message: 'WoHoo You got a discount',
                amount: discountedPrice,
              },
              statusCode: HttpStatus.OK,
            };
          } else {
            return {
              message: {
                message: 'Invalid Coupon Code',
                amount: response.price,
              },
              statusCode: HttpStatus.NOT_FOUND,
            };
          }
        } else {
          return {
            message: { message: '', amount: response.price },
            statusCode: HttpStatus.NOT_FOUND,
          };
        }
      } else {
        return {
          message: 'Plan Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      return {
        message: 'Failed to fetch Plan Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updatePlanMasterDto: UpdatePlanMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.planMaster.update({
        where: { id },
        data: updatePlanMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Plan Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      await this.prisma.planMaster.delete({
        where: { id },
      });
      return {
        message: 'Plan Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Plan Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
