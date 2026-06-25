import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignTypeMasterService } from './campaign-type-master.service';
import { CreateCampaignTypeMasterDto } from './dto/create-campaign-type-master.dto';
import { UpdateCampaignTypeMasterDto } from './dto/update-campaign-type-master.dto';

@Controller('campaign-type-master')
export class CampaignTypeMasterController {
  constructor(private readonly campaignTypeMasterService: CampaignTypeMasterService) {}

  @Post()
  create(@Body() createCampaignTypeMasterDto: CreateCampaignTypeMasterDto) {
    return this.campaignTypeMasterService.create(createCampaignTypeMasterDto);
  }

  @Get()
  findAll() {
    return this.campaignTypeMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignTypeMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignTypeMasterDto: UpdateCampaignTypeMasterDto) {
    return this.campaignTypeMasterService.update(+id, updateCampaignTypeMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignTypeMasterService.remove(+id);
  }
}
