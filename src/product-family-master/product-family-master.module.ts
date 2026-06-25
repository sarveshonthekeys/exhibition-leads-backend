import { Module } from '@nestjs/common';
import { ProductFamilyMasterService } from './product-family-master.service';
import { ProductFamilyMasterController } from './product-family-master.controller';
import { PrismaService } from 'src/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [ProductFamilyMasterController],
  providers: [
    ProductFamilyMasterService,
    PrismaService,
    HelperService,
    SubscriptionMasterService,
  ],
})
export class ProductFamilyMasterModule {}
