import { Module } from '@nestjs/common';
import { VisitorDetailsService } from './visitor-details.service';
import { VisitorDetailsController } from './visitor-details.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VisitorDetailsController],
  providers: [VisitorDetailsService, PrismaService],
})
export class VisitorDetailsModule {}
