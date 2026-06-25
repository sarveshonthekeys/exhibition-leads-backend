import { Module } from '@nestjs/common';
import { DistrictMasterService } from './district-master.service';
import { DistrictMasterController } from './district-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DistrictMasterController],
  providers: [DistrictMasterService, PrismaService],
})
export class DistrictMasterModule {}
