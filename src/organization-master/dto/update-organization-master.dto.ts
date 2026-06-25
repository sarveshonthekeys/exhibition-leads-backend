import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationMasterDto } from './create-organization-master.dto';

export class UpdateOrganizationMasterDto extends PartialType(CreateOrganizationMasterDto) {}
