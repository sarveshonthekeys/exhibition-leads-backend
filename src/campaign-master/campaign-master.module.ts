import { Module } from '@nestjs/common';
import { CampaignMasterService } from './campaign-master.service';
import { CampaignMasterController } from './campaign-master.controller';
import { PrismaService } from 'src/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [CampaignMasterController],
  providers: [
    CampaignMasterService,
    PrismaService,
    HelperService,
    SubscriptionMasterService,
  ],
})
export class CampaignMasterModule {}
