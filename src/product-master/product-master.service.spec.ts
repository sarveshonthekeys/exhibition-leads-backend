import { Test, TestingModule } from '@nestjs/testing';
import { ProductMasterService } from './product-master.service';

describe('ProductMasterService', () => {
  let service: ProductMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMasterService],
    }).compile();

    service = module.get<ProductMasterService>(ProductMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
