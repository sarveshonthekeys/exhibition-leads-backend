import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInterestedController } from './products-interested.controller';
import { ProductsInterestedService } from './products-interested.service';

describe('ProductsInterestedController', () => {
  let controller: ProductsInterestedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsInterestedController],
      providers: [ProductsInterestedService],
    }).compile();

    controller = module.get<ProductsInterestedController>(ProductsInterestedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
