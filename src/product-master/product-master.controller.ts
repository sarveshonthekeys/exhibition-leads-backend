import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductMasterService } from './product-master.service';
import { CreateProductMasterDto } from './dto/create-product-master.dto';
import { UpdateProductMasterDto } from './dto/update-product-master.dto';

@Controller('product-master')
export class ProductMasterController {
  constructor(private readonly productMasterService: ProductMasterService) {}

  @Post()
  create(@Body() createProductMasterDto: CreateProductMasterDto) {
    return this.productMasterService.create(createProductMasterDto);
  }

  @Get()
  findAll() {
    return this.productMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productMasterService.findOne(+id);
  }
  @Get('orgSbuFamily/:orgId/:sbuId/:productFamilyId')
  findOneBlock(
    @Param() params: { sbuId: string; orgId: string; productFamilyId: string },
  ) {
    const { orgId, sbuId, productFamilyId } = params;
    const sbuIdParsed = sbuId === 'null' ? null : parseInt(sbuId, 10); // Handle 'null' as null
    const orgIdIdParsed = orgId === 'null' ? null : parseInt(orgId, 10);
    const proFamilyParsed =
      productFamilyId === 'null' ? null : parseInt(productFamilyId, 10);
    console.log(sbuIdParsed, orgIdIdParsed, proFamilyParsed);
    return this.productMasterService.findByOrgIdSbuIdProFamilyId(
      orgIdIdParsed,
      sbuIdParsed,
      proFamilyParsed,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductMasterDto: UpdateProductMasterDto,
  ) {
    return this.productMasterService.update(+id, updateProductMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productMasterService.remove(+id);
  }
}
