import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationMasterService } from './organization-master.service';
import { CreateOrganizationMasterDto } from './dto/create-organization-master.dto';
import { UpdateOrganizationMasterDto } from './dto/update-organization-master.dto';

@Controller('organization-master')
export class OrganizationMasterController {
  constructor(
    private readonly organizationMasterService: OrganizationMasterService,
  ) {}

  @Post()
  create(@Body() createOrganizationAndUserDto) {
    return this.organizationMasterService.create(createOrganizationAndUserDto);
  }
  @Post('createOrgUser')
  createOrgUser(@Body() createOrganizationAndUserDto) {
    console.log(createOrganizationAndUserDto);
    return this.organizationMasterService.createOrgAndUser(
      createOrganizationAndUserDto,
    );
  }

  @Get()
  findAll() {
    return this.organizationMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationMasterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationMasterDto: UpdateOrganizationMasterDto,
  ) {
    return this.organizationMasterService.update(
      +id,
      updateOrganizationMasterDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationMasterService.remove(+id);
  }
}
