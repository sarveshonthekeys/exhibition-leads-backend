import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampaignMasterService } from './campaign-master.service';
import { CreateCampaignMasterDto } from './dto/create-campaign-master.dto';
import { UpdateCampaignMasterDto } from './dto/update-campaign-master.dto';

@Controller('campaign-master')
export class CampaignMasterController {
  constructor(private readonly campaignMasterService: CampaignMasterService) {}

  @Post()
  create(@Body() createCampaignMasterDto: CreateCampaignMasterDto) {
    return this.campaignMasterService.create(createCampaignMasterDto);
  }

  @Get()
  findAll() {
    return this.campaignMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignMasterService.findOne(+id);
  }
  @Get('org/:orgId')
  findByOrg(@Param('orgId') orgId: string) {
    return this.campaignMasterService.findByOrg(+orgId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignMasterDto: UpdateCampaignMasterDto,
  ) {
    return this.campaignMasterService.update(+id, updateCampaignMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignMasterService.remove(+id);
  }
}
