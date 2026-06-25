import { PartialType } from '@nestjs/mapped-types';
import { CreateGvDisbursementMasterDto } from './create-gv-disbursement-master.dto';

export class UpdateGvDisbursementMasterDto extends PartialType(CreateGvDisbursementMasterDto) {}
