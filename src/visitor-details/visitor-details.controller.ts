import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitorDetailsService } from './visitor-details.service';
import { CreateVisitorDetailDto } from './dto/create-visitor-detail.dto';
import { UpdateVisitorDetailDto } from './dto/update-visitor-detail.dto';

@Controller('visitor-details')
export class VisitorDetailsController {
  constructor(private readonly visitorDetailsService: VisitorDetailsService) {}

  @Post()
  create(@Body() createVisitorDetailDto: CreateVisitorDetailDto) {
    return this.visitorDetailsService.create(createVisitorDetailDto);
  }

  @Get()
  findAll() {
    return this.visitorDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitorDetailDto: UpdateVisitorDetailDto) {
    return this.visitorDetailsService.update(+id, updateVisitorDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorDetailsService.remove(+id);
  }
}
