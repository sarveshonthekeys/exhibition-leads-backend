import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignMasterDto } from './create-campaign-master.dto';

export class UpdateCampaignMasterDto extends PartialType(CreateCampaignMasterDto) {}
