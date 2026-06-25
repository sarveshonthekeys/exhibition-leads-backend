import { Module } from '@nestjs/common';
import { DiscountMasterService } from './discount-master.service';
import { DiscountMasterController } from './discount-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DiscountMasterController],
  providers: [DiscountMasterService, PrismaService],
})
export class DiscountMasterModule {}
