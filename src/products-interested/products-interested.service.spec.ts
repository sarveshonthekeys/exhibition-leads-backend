import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInterestedService } from './products-interested.service';

describe('ProductsInterestedService', () => {
  let service: ProductsInterestedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsInterestedService],
    }).compile();

    service = module.get<ProductsInterestedService>(ProductsInterestedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
