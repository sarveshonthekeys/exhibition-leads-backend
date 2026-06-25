import { Module } from '@nestjs/common';
import { OrganizationTypeMasterService } from './organization-type-master.service';
import { OrganizationTypeMasterController } from './organization-type-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrganizationTypeMasterController],
  providers: [OrganizationTypeMasterService, PrismaService],
})
export class OrganizationTypeMasterModule {}
