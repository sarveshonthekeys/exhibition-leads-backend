import { Module } from '@nestjs/common';
import { CampaignTypeMasterService } from './campaign-type-master.service';
import { CampaignTypeMasterController } from './campaign-type-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CampaignTypeMasterController],
  providers: [CampaignTypeMasterService, PrismaService],
})
export class CampaignTypeMasterModule {}
