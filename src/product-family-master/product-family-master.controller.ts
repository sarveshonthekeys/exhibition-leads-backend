import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductFamilyMasterService } from './product-family-master.service';
import { CreateProductFamilyMasterDto } from './dto/create-product-family-master.dto';
import { UpdateProductFamilyMasterDto } from './dto/update-product-family-master.dto';

@Controller('product-family-master')
export class ProductFamilyMasterController {
  constructor(
    private readonly productFamilyMasterService: ProductFamilyMasterService,
  ) {}

  @Post()
  create(@Body() createProductFamilyMasterDto: CreateProductFamilyMasterDto) {
    return this.productFamilyMasterService.create(createProductFamilyMasterDto);
  }

  @Get()
  findAll() {
    return this.productFamilyMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productFamilyMasterService.findOne(+id);
  }
  @Get('orgSbu/:orgId/:sbuId')
  findOneBlock(@Param() params: { orgId: string; sbuId: string }) {
    const { orgId, sbuId } = params;
    const sbuIdParsed = sbuId === 'null' ? null : parseInt(sbuId, 10); // Handle 'null' as null
    const orgIdIdParsed = orgId === 'null' ? null : parseInt(orgId, 10);
    console.log(sbuIdParsed, orgIdIdParsed);
    return this.productFamilyMasterService.findByOrgIdSbuId(
      orgIdIdParsed,
      sbuIdParsed,
    );
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductFamilyMasterDto: UpdateProductFamilyMasterDto,
  ) {
    return this.productFamilyMasterService.update(
      +id,
      updateProductFamilyMasterDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productFamilyMasterService.remove(+id);
  }
}
