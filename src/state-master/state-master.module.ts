import { Module } from '@nestjs/common';
import { StateMasterService } from './state-master.service';
import { StateMasterController } from './state-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StateMasterController],
  providers: [StateMasterService, PrismaService],
})
export class StateMasterModule {}
