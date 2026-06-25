import { PartialType } from '@nestjs/mapped-types';
import { CreateSbuMasterDto } from './create-sbu-master.dto';

export class UpdateSbuMasterDto extends PartialType(CreateSbuMasterDto) {}
