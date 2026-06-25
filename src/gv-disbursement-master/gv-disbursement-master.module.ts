import { Module } from '@nestjs/common';
import { GvDisbursementMasterService } from './gv-disbursement-master.service';
import { GvDisbursementMasterController } from './gv-disbursement-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GvDisbursementMasterController],
  providers: [GvDisbursementMasterService, PrismaService],
})
export class GvDisbursementMasterModule {}
