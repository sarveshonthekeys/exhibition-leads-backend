import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanMasterService } from './plan-master.service';
import { CreatePlanMasterDto } from './dto/create-plan-master.dto';
import { UpdatePlanMasterDto } from './dto/update-plan-master.dto';

@Controller('plan-master')
export class PlanMasterController {
  constructor(private readonly planMasterService: PlanMasterService) {}

  @Post()
  create(@Body() createPlanMasterDto: CreatePlanMasterDto) {
    return this.planMasterService.create(createPlanMasterDto);
  }

  @Get()
  findAll() {
    return this.planMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planMasterService.findOne(+id);
  }
  @Get('discountedAmount/:planId/:couponCode?')
  getDiscountValue(@Param() params: { planId: string; couponCode: string }) {
    const { planId, couponCode } = params;
    const planIDParsed = planId === 'null' ? null : parseInt(planId, 10);
    const couponCodeParsed = couponCode === 'null' ? null : couponCode;
    return this.planMasterService.getDiscountValue(
      planIDParsed,
      couponCodeParsed,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanMasterDto: UpdatePlanMasterDto,
  ) {
    return this.planMasterService.update(+id, updatePlanMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planMasterService.remove(+id);
  }
}
