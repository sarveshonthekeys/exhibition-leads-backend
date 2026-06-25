import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountMasterService } from './discount-master.service';
import { CreateDiscountMasterDto } from './dto/create-discount-master.dto';
import { UpdateDiscountMasterDto } from './dto/update-discount-master.dto';

@Controller('discount-master')
export class DiscountMasterController {
  constructor(private readonly discountMasterService: DiscountMasterService) {}

  @Post()
  create(@Body() createDiscountMasterDto: CreateDiscountMasterDto) {
    return this.discountMasterService.create(createDiscountMasterDto);
  }

  @Get()
  findAll() {
    return this.discountMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountMasterDto: UpdateDiscountMasterDto) {
    return this.discountMasterService.update(+id, updateDiscountMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountMasterService.remove(+id);
  }
}
