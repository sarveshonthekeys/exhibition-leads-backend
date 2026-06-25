import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { HelperController } from './helper.controller';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [HelperController],
  providers: [HelperService, PrismaService, SubscriptionMasterService],
})
export class HelperModule {}
