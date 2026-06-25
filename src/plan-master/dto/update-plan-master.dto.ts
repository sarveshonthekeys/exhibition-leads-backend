import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanMasterDto } from './create-plan-master.dto';

export class UpdatePlanMasterDto extends PartialType(CreatePlanMasterDto) {}
