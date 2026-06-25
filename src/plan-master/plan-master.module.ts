import { Module } from '@nestjs/common';
import { PlanMasterService } from './plan-master.service';
import { PlanMasterController } from './plan-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlanMasterController],
  providers: [PlanMasterService, PrismaService],
})
export class PlanMasterModule {}
