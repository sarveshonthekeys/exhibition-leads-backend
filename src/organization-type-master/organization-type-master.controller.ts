import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationTypeMasterService } from './organization-type-master.service';
import { CreateOrganizationTypeMasterDto } from './dto/create-organization-type-master.dto';
import { UpdateOrganizationTypeMasterDto } from './dto/update-organization-type-master.dto';

@Controller('organization-type-master')
export class OrganizationTypeMasterController {
  constructor(private readonly organizationTypeMasterService: OrganizationTypeMasterService) {}

  @Post()
  create(@Body() createOrganizationTypeMasterDto: CreateOrganizationTypeMasterDto) {
    return this.organizationTypeMasterService.create(createOrganizationTypeMasterDto);
  }

  @Get()
  findAll() {
    return this.organizationTypeMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationTypeMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationTypeMasterDto: UpdateOrganizationTypeMasterDto) {
    return this.organizationTypeMasterService.update(+id, updateOrganizationTypeMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationTypeMasterService.remove(+id);
  }
}
