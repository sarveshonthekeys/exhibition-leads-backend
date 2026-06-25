import { Module } from '@nestjs/common';
import { VisitorMasterService } from './visitor-master.service';
import { VisitorMasterController } from './visitor-master.controller';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/emailService';
import { HelperService } from 'src/helper/helper.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';

@Module({
  controllers: [VisitorMasterController],
  providers: [
    VisitorMasterService,
    PrismaService,
    EmailService,
    HelperService,
    SubscriptionMasterService,
  ],
})
export class VisitorMasterModule {}
