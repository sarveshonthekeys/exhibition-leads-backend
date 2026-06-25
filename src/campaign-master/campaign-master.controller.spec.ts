import { Test, TestingModule } from '@nestjs/testing';
import { CampaignMasterController } from './campaign-master.controller';
import { CampaignMasterService } from './campaign-master.service';

describe('CampaignMasterController', () => {
  let controller: CampaignMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignMasterController],
      providers: [CampaignMasterService],
    }).compile();

    controller = module.get<CampaignMasterController>(CampaignMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
