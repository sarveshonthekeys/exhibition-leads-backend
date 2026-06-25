import { Module } from '@nestjs/common';
import { ProductMasterService } from './product-master.service';
import { ProductMasterController } from './product-master.controller';
import { PrismaService } from 'src/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [ProductMasterController],
  providers: [
    ProductMasterService,
    PrismaService,
    HelperService,
    SubscriptionMasterService,
  ],
})
export class ProductMasterModule {}
