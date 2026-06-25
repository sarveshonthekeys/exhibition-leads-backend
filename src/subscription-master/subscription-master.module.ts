import { Module } from '@nestjs/common';
import { SubscriptionMasterService } from './subscription-master.service';
import { SubscriptionMasterController } from './subscription-master.controller';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionScheduler } from './subscription.scheduler';

@Module({
  controllers: [SubscriptionMasterController],
  providers: [SubscriptionMasterService, PrismaService, SubscriptionScheduler],
})
export class SubscriptionMasterModule {}
