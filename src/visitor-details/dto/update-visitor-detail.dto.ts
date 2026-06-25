import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitorDetailDto } from './create-visitor-detail.dto';

export class UpdateVisitorDetailDto extends PartialType(CreateVisitorDetailDto) {}
