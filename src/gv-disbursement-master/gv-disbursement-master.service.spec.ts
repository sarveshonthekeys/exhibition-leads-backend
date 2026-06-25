import { Test, TestingModule } from '@nestjs/testing';
import { GvDisbursementMasterService } from './gv-disbursement-master.service';

describe('GvDisbursementMasterService', () => {
  let service: GvDisbursementMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GvDisbursementMasterService],
    }).compile();

    service = module.get<GvDisbursementMasterService>(GvDisbursementMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
