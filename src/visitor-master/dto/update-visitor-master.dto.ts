import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitorMasterDto } from './create-visitor-master.dto';

export class UpdateVisitorMasterDto extends PartialType(CreateVisitorMasterDto) {}
