import { Test, TestingModule } from '@nestjs/testing';
import { DiscountMasterService } from './discount-master.service';

describe('DiscountMasterService', () => {
  let service: DiscountMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountMasterService],
    }).compile();

    service = module.get<DiscountMasterService>(DiscountMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
