import { Module } from '@nestjs/common';
import { IndustryTypeMasterService } from './industry-type-master.service';
import { IndustryTypeMasterController } from './industry-type-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IndustryTypeMasterController],
  providers: [IndustryTypeMasterService, PrismaService],
})
export class IndustryTypeMasterModule {}
