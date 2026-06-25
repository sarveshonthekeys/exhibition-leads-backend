import { Test, TestingModule } from '@nestjs/testing';
import { CampaignMasterService } from './campaign-master.service';

describe('CampaignMasterService', () => {
  let service: CampaignMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignMasterService],
    }).compile();

    service = module.get<CampaignMasterService>(CampaignMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
