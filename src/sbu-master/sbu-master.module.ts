import { Module } from '@nestjs/common';
import { SbuMasterService } from './sbu-master.service';
import { SbuMasterController } from './sbu-master.controller';
import { PrismaService } from 'src/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [SbuMasterController],
  providers: [
    SbuMasterService,
    PrismaService,
    HelperService,
    SubscriptionMasterService,
  ],
})
export class SbuMasterModule {}
