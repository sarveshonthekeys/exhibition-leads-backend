import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMasterService } from './role-master.service';
import { CreateRoleMasterDto } from './dto/create-role-master.dto';
import { UpdateRoleMasterDto } from './dto/update-role-master.dto';

@Controller('role-master')
export class RoleMasterController {
  constructor(private readonly roleMasterService: RoleMasterService) {}

  @Post()
  create(@Body() createRoleMasterDto: CreateRoleMasterDto) {
    return this.roleMasterService.create(createRoleMasterDto);
  }

  @Get()
  findAll() {
    return this.roleMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleMasterDto: UpdateRoleMasterDto) {
    return this.roleMasterService.update(+id, updateRoleMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleMasterService.remove(+id);
  }
}
