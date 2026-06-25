import { Test, TestingModule } from '@nestjs/testing';
import { VisitorMasterService } from './visitor-master.service';

describe('VisitorMasterService', () => {
  let service: VisitorMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitorMasterService],
    }).compile();

    service = module.get<VisitorMasterService>(VisitorMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
