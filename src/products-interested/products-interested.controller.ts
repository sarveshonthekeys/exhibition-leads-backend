import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsInterestedService } from './products-interested.service';
import { CreateProductsInterestedDto } from './dto/create-products-interested.dto';
import { UpdateProductsInterestedDto } from './dto/update-products-interested.dto';

@Controller('products-interested')
export class ProductsInterestedController {
  constructor(
    private readonly productsInterestedService: ProductsInterestedService,
  ) {}
  private parseParamToNumber(param?: string): number | null {
    return param && param !== 'null' ? parseInt(param, 10) : null;
  }
  @Post()
  create(@Body() createProductsInterestedDto: CreateProductsInterestedDto) {
    return this.productsInterestedService.create(createProductsInterestedDto);
  }

  @Get()
  findAll() {
    return this.productsInterestedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsInterestedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductsInterestedDto: UpdateProductsInterestedDto,
  ) {
    return this.productsInterestedService.update(
      +id,
      updateProductsInterestedDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsInterestedService.remove(+id);
  }
  @Get('totals/:orgId/:sbuId?/:userId?')
  async getProductsWithTotals(
    @Param() params: { orgId: string; sbuId: string; userId: string },
  ) {
    const { orgId, sbuId, userId } = params;
    const orgIdParsed = this.parseParamToNumber(orgId);
    const sbuIdParsed = this.parseParamToNumber(sbuId); // Handle 'null' as null
    const userIdParsed = this.parseParamToNumber(userId);
    return this.productsInterestedService.getProductsAndTotalQuantity(
      orgIdParsed,
      sbuIdParsed,
      userIdParsed,
    );
  }
}
