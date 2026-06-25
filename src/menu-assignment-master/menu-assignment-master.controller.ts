import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuAssignmentMasterService } from './menu-assignment-master.service';
import { CreateMenuAssignmentMasterDto } from './dto/create-menu-assignment-master.dto';
import { UpdateMenuAssignmentMasterDto } from './dto/update-menu-assignment-master.dto';

@Controller('menu-assignment-master')
export class MenuAssignmentMasterController {
  constructor(private readonly menuAssignmentMasterService: MenuAssignmentMasterService) {}

  @Post()
  create(@Body() createMenuAssignmentMasterDto: CreateMenuAssignmentMasterDto) {
    return this.menuAssignmentMasterService.create(createMenuAssignmentMasterDto);
  }

  @Get()
  findAll() {
    return this.menuAssignmentMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuAssignmentMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuAssignmentMasterDto: UpdateMenuAssignmentMasterDto) {
    return this.menuAssignmentMasterService.update(+id, updateMenuAssignmentMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuAssignmentMasterService.remove(+id);
  }
}
