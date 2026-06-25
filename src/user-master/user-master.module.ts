import { Module } from '@nestjs/common';
import { UserMasterService } from './user-master.service';
import { UserMasterController } from './user-master.controller';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/emailService';
import { HelperService } from 'src/helper/helper.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [UserMasterController],
  providers: [
    UserMasterService,
    PrismaService,
    EmailService,
    HelperService,
    SubscriptionMasterService,
  ],
})
export class UserMasterModule {}
