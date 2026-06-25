import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionMasterService } from './subscription-master.service';

describe('SubscriptionMasterService', () => {
  let service: SubscriptionMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionMasterService],
    }).compile();

    service = module.get<SubscriptionMasterService>(SubscriptionMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
