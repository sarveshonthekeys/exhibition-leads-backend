import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DistrictMasterService } from './district-master.service';
import { CreateDistrictMasterDto } from './dto/create-district-master.dto';
import { UpdateDistrictMasterDto } from './dto/update-district-master.dto';

@Controller('district-master')
export class DistrictMasterController {
  constructor(private readonly districtMasterService: DistrictMasterService) {}

  // @Post()
  // create(@Body() createDistrictMasterDto: CreateDistrictMasterDto) {
  //   return this.districtMasterService.create(createDistrictMasterDto);
  // }
  @Get()
  async findAll(@Param('stateId') stateId?: number) {
    // Convert stateId to number if provided; otherwise, pass undefined
    return this.districtMasterService.findAll(stateId);
  }

  @Get(':id')
  findDistricts(@Param('id') id: string) {
    return this.districtMasterService.findDistricts(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDistrictMasterDto: UpdateDistrictMasterDto) {
  //   return this.districtMasterService.update(+id, updateDistrictMasterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.districtMasterService.remove(+id);
  // }
}
