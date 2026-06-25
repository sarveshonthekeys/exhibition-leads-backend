import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SbuMasterService } from './sbu-master.service';
import { CreateSbuMasterDto } from './dto/create-sbu-master.dto';
import { UpdateSbuMasterDto } from './dto/update-sbu-master.dto';

@Controller('sbu-master')
export class SbuMasterController {
  constructor(private readonly sbuMasterService: SbuMasterService) {}

  @Post()
  create(@Body() createSbuMasterDto: CreateSbuMasterDto) {
    return this.sbuMasterService.create(createSbuMasterDto);
  }

  @Get()
  findAll() {
    return this.sbuMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sbuMasterService.findOne(+id);
  }
  @Get('org/:orgId')
  findByOrg(@Param('orgId') orgId: string) {
    return this.sbuMasterService.findByOrg(+orgId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSbuMasterDto: UpdateSbuMasterDto,
  ) {
    return this.sbuMasterService.update(+id, updateSbuMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sbuMasterService.remove(+id);
  }
}
