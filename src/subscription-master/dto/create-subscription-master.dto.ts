export class CreateSubscriptionMasterDto {
  orgId: number;
  userId: number;
  planId: number;
  couponCode?: string;
  discountedPrice?: number;
  startDate?: string;
  endDate?: string;
  transactionStatus: boolean;
  transactionReference?: string;
  noOfDaysPending: string;
  status: boolean;
  isActive: boolean;
}
