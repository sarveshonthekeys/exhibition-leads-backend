import { Test, TestingModule } from '@nestjs/testing';
import { DiscountMasterController } from './discount-master.controller';
import { DiscountMasterService } from './discount-master.service';

describe('DiscountMasterController', () => {
  let controller: DiscountMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountMasterController],
      providers: [DiscountMasterService],
    }).compile();

    controller = module.get<DiscountMasterController>(DiscountMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
