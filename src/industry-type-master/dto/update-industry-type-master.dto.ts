import { PartialType } from '@nestjs/mapped-types';
import { CreateIndustryTypeMasterDto } from './create-industry-type-master.dto';

export class UpdateIndustryTypeMasterDto extends PartialType(CreateIndustryTypeMasterDto) {}
