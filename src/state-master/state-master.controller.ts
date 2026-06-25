import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StateMasterService } from './state-master.service';
import { CreateStateMasterDto } from './dto/create-state-master.dto';
import { UpdateStateMasterDto } from './dto/update-state-master.dto';

@Controller('state-master')
export class StateMasterController {
  constructor(private readonly stateMasterService: StateMasterService) {}

  // @Post()
  // create(@Body() createStateMasterDto: CreateStateMasterDto) {
  //   return this.stateMasterService.create(createStateMasterDto);
  // }

  @Get()
  findAll() {
    return this.stateMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateMasterService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStateMasterDto: UpdateStateMasterDto) {
  //   return this.stateMasterService.update(+id, updateStateMasterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stateMasterService.remove(+id);
  // }
}
