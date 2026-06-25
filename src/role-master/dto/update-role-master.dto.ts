import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleMasterDto } from './create-role-master.dto';

export class UpdateRoleMasterDto extends PartialType(CreateRoleMasterDto) {}
