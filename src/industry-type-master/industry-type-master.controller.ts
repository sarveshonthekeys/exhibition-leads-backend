import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndustryTypeMasterService } from './industry-type-master.service';
import { CreateIndustryTypeMasterDto } from './dto/create-industry-type-master.dto';
import { UpdateIndustryTypeMasterDto } from './dto/update-industry-type-master.dto';

@Controller('industry-type-master')
export class IndustryTypeMasterController {
  constructor(private readonly industryTypeMasterService: IndustryTypeMasterService) {}

  @Post()
  create(@Body() createIndustryTypeMasterDto: CreateIndustryTypeMasterDto) {
    return this.industryTypeMasterService.create(createIndustryTypeMasterDto);
  }

  @Get()
  findAll() {
    return this.industryTypeMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.industryTypeMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndustryTypeMasterDto: UpdateIndustryTypeMasterDto) {
    return this.industryTypeMasterService.update(+id, updateIndustryTypeMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.industryTypeMasterService.remove(+id);
  }
}
