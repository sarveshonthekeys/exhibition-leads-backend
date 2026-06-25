import { Test, TestingModule } from '@nestjs/testing';
import { SbuMasterService } from './sbu-master.service';

describe('SbuMasterService', () => {
  let service: SbuMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SbuMasterService],
    }).compile();

    service = module.get<SbuMasterService>(SbuMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
