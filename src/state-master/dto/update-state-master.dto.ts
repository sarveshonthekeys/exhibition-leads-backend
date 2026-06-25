import { PartialType } from '@nestjs/mapped-types';
import { CreateStateMasterDto } from './create-state-master.dto';

export class UpdateStateMasterDto extends PartialType(CreateStateMasterDto) {}
