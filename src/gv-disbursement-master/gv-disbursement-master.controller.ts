import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GvDisbursementMasterService } from './gv-disbursement-master.service';
import { CreateGvDisbursementMasterDto } from './dto/create-gv-disbursement-master.dto';
import { UpdateGvDisbursementMasterDto } from './dto/update-gv-disbursement-master.dto';

@Controller('gv-disbursement-master')
export class GvDisbursementMasterController {
  constructor(private readonly gvDisbursementMasterService: GvDisbursementMasterService) {}

  @Post()
  create(@Body() createGvDisbursementMasterDto: CreateGvDisbursementMasterDto) {
    return this.gvDisbursementMasterService.create(createGvDisbursementMasterDto);
  }

  @Get()
  findAll() {
    return this.gvDisbursementMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gvDisbursementMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGvDisbursementMasterDto: UpdateGvDisbursementMasterDto) {
    return this.gvDisbursementMasterService.update(+id, updateGvDisbursementMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gvDisbursementMasterService.remove(+id);
  }
}
