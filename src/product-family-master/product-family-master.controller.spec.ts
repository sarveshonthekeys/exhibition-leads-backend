import { Test, TestingModule } from '@nestjs/testing';
import { ProductFamilyMasterController } from './product-family-master.controller';
import { ProductFamilyMasterService } from './product-family-master.service';

describe('ProductFamilyMasterController', () => {
  let controller: ProductFamilyMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFamilyMasterController],
      providers: [ProductFamilyMasterService],
    }).compile();

    controller = module.get<ProductFamilyMasterController>(ProductFamilyMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
