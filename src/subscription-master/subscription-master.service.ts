import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionMasterDto } from './dto/create-subscription-master.dto';
import { UpdateSubscriptionMasterDto } from './dto/update-subscription-master.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseDto } from 'src/dto/Response.dto';
import { addDays, differenceInDays, format } from 'date-fns';

@Injectable()
export class SubscriptionMasterService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createSubscriptionMasterDto: CreateSubscriptionMasterDto,
  ): Promise<ResponseDto> {
    try {
      try {
        const orgId = createSubscriptionMasterDto.orgId;
        const whereClause = { orgId, status: true };
        const planExist = await this.prisma.subscriptionMaster.findFirst({
          where: whereClause,
          orderBy: { endDate: 'desc' },
        });
        const plan = await this.prisma.planMaster.findUnique({
          where: { id: createSubscriptionMasterDto.planId },
        });
        console.log(planExist);
        if (planExist != null) {
          const startDate = format(new Date(planExist.endDate), 'yyyy-MM-dd');
          const endDate = format(
            addDays(startDate, plan.validityInDays),
            'yyyy-MM-dd',
          );
          const response = await this.prisma.subscriptionMaster.create({
            data: {
              orgId: createSubscriptionMasterDto.orgId,
              userId: createSubscriptionMasterDto.userId,
              planId: createSubscriptionMasterDto.planId,
              startDate: startDate,
              endDate: endDate,
              transactionStatus: createSubscriptionMasterDto.transactionStatus,
              transactionReference:
                createSubscriptionMasterDto.transactionReference,
              noOfDaysPending: differenceInDays(endDate, startDate).toString(),
              couponCode: createSubscriptionMasterDto.couponCode,
              discountedPrice: createSubscriptionMasterDto.discountedPrice,
              isActive: false,
              status: true,
            },
          });
          return {
            message: response,
            statusCode: HttpStatus.CREATED,
          };
        } else {
          const startDate = format(new Date(), 'yyyy-MM-dd');
          const endDate = format(
            addDays(startDate, plan.validityInDays),
            'yyyy-MM-dd',
          );
          const response = await this.prisma.subscriptionMaster.create({
            data: {
              orgId: createSubscriptionMasterDto.orgId,
              userId: createSubscriptionMasterDto.userId,
              planId: createSubscriptionMasterDto.planId,
              startDate: startDate,
              endDate: endDate,
              transactionStatus: createSubscriptionMasterDto.transactionStatus,
              transactionReference:
                createSubscriptionMasterDto.transactionReference,
              noOfDaysPending: differenceInDays(endDate, startDate).toString(),
              couponCode: createSubscriptionMasterDto.couponCode,
              discountedPrice: createSubscriptionMasterDto.discountedPrice,
              isActive: true,
              status: true,
            },
          });
          return {
            message: response,
            statusCode: HttpStatus.CREATED,
          };
        }
      } catch {}
    } catch (error) {
      return {
        message: 'Failed to create Subscription Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll(): Promise<ResponseDto> {
    try {
      const subscriptions = await this.prisma.subscriptionMaster.findMany();
      return {
        message: subscriptions,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Subscription Masters',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto> {
    try {
      const response = await this.prisma.subscriptionMaster.findUnique({
        where: { id },
      });

      if (!response) {
        return {
          message: 'Subscription Master not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Subscription Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  async findByOrgIsActive(
    orgId: number,
    isActive?: boolean,
  ): Promise<ResponseDto> {
    try {
      const whereClaue = {
        ...(orgId != null && { orgId }),
        ...(isActive !== null ? { isActive } : {}),
      };
      const response = await this.prisma.subscriptionMaster.findMany({
        where: whereClaue,
        orderBy: { startDate: 'asc' },
      });

      if (!response) {
        return {
          message: 'Subscrption not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch Subscrption',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async update(
    id: number,
    updateSubscriptionMasterDto: UpdateSubscriptionMasterDto,
  ): Promise<ResponseDto> {
    try {
      const response = await this.prisma.subscriptionMaster.update({
        where: { id },
        data: updateSubscriptionMasterDto,
      });
      return {
        message: response,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to update Subscription Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async remove(id: number): Promise<ResponseDto> {
    try {
      await this.prisma.subscriptionMaster.delete({
        where: { id },
      });
      return {
        message: 'Subscription Master deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Failed to delete Subscription Master',
        error: error.message,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async markExpiredSubscriptions(): Promise<number> {
    const today = new Date();
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const formattedDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

    // Find subscriptions that are active but expired
    const expiredSubscriptions = await this.prisma.subscriptionMaster.findMany({
      where: {
        status: true, // Active subscriptions
        endDate: todayDate, // Expired subscription
      },
    });

    if (expiredSubscriptions.length === 0) {
      return 0; // No subscriptions to update
    }

    // Update the status of expired subscriptions to inactive
    const result = await this.prisma.subscriptionMaster.updateMany({
      where: {
        id: {
          in: expiredSubscriptions.map((sub) => sub.id),
        },
      },
      data: {
        isActive: false,
      },
    });

    return result.count; // Return the count of updated subscriptions
  }
  async markStartingSubscription(): Promise<number> {
    const today = new Date();
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const formattedDate = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

    // Find subscriptions that are active but expired
    const toBeStartedSubscriptions =
      await this.prisma.subscriptionMaster.findMany({
        where: {
          status: true, // Active subscriptions
          startDate: todayDate, // to be started today subscription
        },
      });

    if (toBeStartedSubscriptions.length === 0) {
      return 0; // No subscriptions to update
    }

    // Update the status of expired subscriptions to inactive
    const result = await this.prisma.subscriptionMaster.updateMany({
      where: {
        id: {
          in: toBeStartedSubscriptions.map((sub) => sub.id),
        },
      },
      data: {
        isActive: true, // Mark as active
      },
    });

    return result.count; // Return the count of updated subscriptions
  }
}
