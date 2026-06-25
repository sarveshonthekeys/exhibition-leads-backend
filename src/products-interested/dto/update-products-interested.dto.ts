import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsInterestedDto } from './create-products-interested.dto';

export class UpdateProductsInterestedDto extends PartialType(CreateProductsInterestedDto) {}
