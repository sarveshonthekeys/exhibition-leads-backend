import { PartialType } from '@nestjs/mapped-types';
import { CreateProductMasterDto } from './create-product-master.dto';

export class UpdateProductMasterDto extends PartialType(CreateProductMasterDto) {}
