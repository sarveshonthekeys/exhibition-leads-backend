import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionMasterService } from './subscription-master.service';
import { CreateSubscriptionMasterDto } from './dto/create-subscription-master.dto';
import { UpdateSubscriptionMasterDto } from './dto/update-subscription-master.dto';

@Controller('subscription-master')
export class SubscriptionMasterController {
  constructor(
    private readonly subscriptionMasterService: SubscriptionMasterService,
  ) {}

  @Post()
  create(@Body() createSubscriptionMasterDto: CreateSubscriptionMasterDto) {
    return this.subscriptionMasterService.create(createSubscriptionMasterDto);
  }

  @Get()
  findAll() {
    return this.subscriptionMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionMasterService.findOne(+id);
  }
  @Get('orgIsActive/:orgId/:isActive?')
  findByOrgIsActive(@Param() params: { orgId: string; isActive: string }) {
    const { orgId, isActive } = params;
    const orgIdIdParsed = orgId === 'null' ? null : parseInt(orgId, 10);
    const isActiveParsed =
      isActive === 'null'
        ? null
        : isActive === 'true'
          ? true
          : isActive === 'false'
            ? false
            : null;
    return this.subscriptionMasterService.findByOrgIsActive(
      orgIdIdParsed,
      isActiveParsed,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionMasterDto: UpdateSubscriptionMasterDto,
  ) {
    return this.subscriptionMasterService.update(
      +id,
      updateSubscriptionMasterDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionMasterService.remove(+id);
  }
}
