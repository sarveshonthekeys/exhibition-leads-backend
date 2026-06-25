import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionMasterDto } from './create-subscription-master.dto';

export class UpdateSubscriptionMasterDto extends PartialType(CreateSubscriptionMasterDto) {}
