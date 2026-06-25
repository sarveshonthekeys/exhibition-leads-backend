import { Module } from '@nestjs/common';
import { OrganizationMasterService } from './organization-master.service';
import { OrganizationMasterController } from './organization-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrganizationMasterController],
  providers: [OrganizationMasterService, PrismaService],
})
export class OrganizationMasterModule {}
