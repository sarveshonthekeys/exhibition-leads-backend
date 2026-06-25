import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationTypeMasterDto } from './create-organization-type-master.dto';

export class UpdateOrganizationTypeMasterDto extends PartialType(CreateOrganizationTypeMasterDto) {}
