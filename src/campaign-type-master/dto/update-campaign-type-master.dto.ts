import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignTypeMasterDto } from './create-campaign-type-master.dto';

export class UpdateCampaignTypeMasterDto extends PartialType(CreateCampaignTypeMasterDto) {}
