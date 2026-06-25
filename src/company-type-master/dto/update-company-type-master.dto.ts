import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyTypeMasterDto } from './create-company-type-master.dto';

export class UpdateCompanyTypeMasterDto extends PartialType(CreateCompanyTypeMasterDto) {}
