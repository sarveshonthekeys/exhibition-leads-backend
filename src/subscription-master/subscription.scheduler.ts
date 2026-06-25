import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SubscriptionMasterService } from './subscription-master.service';

@Injectable()
export class SubscriptionScheduler {
  private readonly logger = new Logger(SubscriptionScheduler.name);

  constructor(
    private readonly subscriptionService: SubscriptionMasterService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Runs every day at midnight
  async handleExpiredSubscriptions() {
    console.log("'Running subscription expiry check...'");
    this.logger.log('Running subscription expiry check...');

    try {
      const updatedCount =
        await this.subscriptionService.markExpiredSubscriptions();
      this.logger.log(`${updatedCount} subscriptions marked as inactive.`);
    } catch (error) {
      this.logger.error('Failed to mark subscriptions as inactive.', error);
    }
  }
  // @Cron(CronExpression.EVERY_DAY_AT)
  // async activateSubscription() {
  //   console.log('started');
  //   console.log("'Running subscription validity check...'");
  //   this.logger.log('Running subscription validity check...');

  //   try {
  //     const updatedCount =
  //       await this.subscriptionService.markStartingSubscription();
  //     this.logger.log(`${updatedCount} subscriptions marked as active.`);
  //   } catch (error) {
  //     this.logger.error('Failed to mark subscriptions as active.', error);
  //   }
  // }
}
