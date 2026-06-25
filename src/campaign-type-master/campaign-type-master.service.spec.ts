import { Test, TestingModule } from '@nestjs/testing';
import { CampaignTypeMasterService } from './campaign-type-master.service';

describe('CampaignTypeMasterService', () => {
  let service: CampaignTypeMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignTypeMasterService],
    }).compile();

    service = module.get<CampaignTypeMasterService>(CampaignTypeMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
