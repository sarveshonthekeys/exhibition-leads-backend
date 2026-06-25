import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyTypeMasterService } from './company-type-master.service';
import { CreateCompanyTypeMasterDto } from './dto/create-company-type-master.dto';
import { UpdateCompanyTypeMasterDto } from './dto/update-company-type-master.dto';

@Controller('company-type-master')
export class CompanyTypeMasterController {
  constructor(private readonly companyTypeMasterService: CompanyTypeMasterService) {}

  @Post()
  create(@Body() createCompanyTypeMasterDto: CreateCompanyTypeMasterDto) {
    return this.companyTypeMasterService.create(createCompanyTypeMasterDto);
  }

  @Get()
  findAll() {
    return this.companyTypeMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyTypeMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyTypeMasterDto: UpdateCompanyTypeMasterDto) {
    return this.companyTypeMasterService.update(+id, updateCompanyTypeMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyTypeMasterService.remove(+id);
  }
}
