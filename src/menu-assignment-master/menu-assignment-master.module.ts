import { Module } from '@nestjs/common';
import { MenuAssignmentMasterService } from './menu-assignment-master.service';
import { MenuAssignmentMasterController } from './menu-assignment-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MenuAssignmentMasterController],
  providers: [MenuAssignmentMasterService, PrismaService],
})
export class MenuAssignmentMasterModule {}
