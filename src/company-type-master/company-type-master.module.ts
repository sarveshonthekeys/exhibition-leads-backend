import { Module } from '@nestjs/common';
import { CompanyTypeMasterService } from './company-type-master.service';
import { CompanyTypeMasterController } from './company-type-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CompanyTypeMasterController],
  providers: [CompanyTypeMasterService, PrismaService],
})
export class CompanyTypeMasterModule {}
