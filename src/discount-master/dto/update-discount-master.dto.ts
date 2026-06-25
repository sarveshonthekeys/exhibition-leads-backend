import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountMasterDto } from './create-discount-master.dto';

export class UpdateDiscountMasterDto extends PartialType(CreateDiscountMasterDto) {}
