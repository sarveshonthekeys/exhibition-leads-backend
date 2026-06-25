import { Test, TestingModule } from '@nestjs/testing';
import { ProductFamilyMasterService } from './product-family-master.service';

describe('ProductFamilyMasterService', () => {
  let service: ProductFamilyMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFamilyMasterService],
    }).compile();

    service = module.get<ProductFamilyMasterService>(ProductFamilyMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
