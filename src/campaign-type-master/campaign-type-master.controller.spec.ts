import { Test, TestingModule } from '@nestjs/testing';
import { CampaignTypeMasterController } from './campaign-type-master.controller';
import { CampaignTypeMasterService } from './campaign-type-master.service';

describe('CampaignTypeMasterController', () => {
  let controller: CampaignTypeMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignTypeMasterController],
      providers: [CampaignTypeMasterService],
    }).compile();

    controller = module.get<CampaignTypeMasterController>(CampaignTypeMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
