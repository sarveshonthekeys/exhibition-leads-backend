import { PartialType } from '@nestjs/mapped-types';
import { CreateDistrictMasterDto } from './create-district-master.dto';

export class UpdateDistrictMasterDto extends PartialType(CreateDistrictMasterDto) {}
