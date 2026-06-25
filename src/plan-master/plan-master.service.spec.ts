import { Test, TestingModule } from '@nestjs/testing';
import { PlanMasterService } from './plan-master.service';

describe('PlanMasterService', () => {
  let service: PlanMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanMasterService],
    }).compile();

    service = module.get<PlanMasterService>(PlanMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
