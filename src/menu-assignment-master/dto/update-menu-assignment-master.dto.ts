import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuAssignmentMasterDto } from './create-menu-assignment-master.dto';

export class UpdateMenuAssignmentMasterDto extends PartialType(CreateMenuAssignmentMasterDto) {}
