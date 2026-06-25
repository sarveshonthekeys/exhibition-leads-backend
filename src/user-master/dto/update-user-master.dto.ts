import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMasterDto } from './create-user-master.dto';

export class UpdateUserMasterDto extends PartialType(CreateUserMasterDto) {}
