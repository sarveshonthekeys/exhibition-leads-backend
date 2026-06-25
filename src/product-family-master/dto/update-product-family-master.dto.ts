import { PartialType } from '@nestjs/mapped-types';
import { CreateProductFamilyMasterDto } from './create-product-family-master.dto';

export class UpdateProductFamilyMasterDto extends PartialType(CreateProductFamilyMasterDto) {}
