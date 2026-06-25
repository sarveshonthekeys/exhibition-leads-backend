import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionMasterController } from './subscription-master.controller';
import { SubscriptionMasterService } from './subscription-master.service';

describe('SubscriptionMasterController', () => {
  let controller: SubscriptionMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionMasterController],
      providers: [SubscriptionMasterService],
    }).compile();

    controller = module.get<SubscriptionMasterController>(SubscriptionMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
