import { Module } from '@nestjs/common';
import { RoleMasterService } from './role-master.service';
import { RoleMasterController } from './role-master.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RoleMasterController],
  providers: [RoleMasterService, PrismaService],
})
export class RoleMasterModule {}
