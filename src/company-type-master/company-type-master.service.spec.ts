import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypeMasterService } from './company-type-master.service';

describe('CompanyTypeMasterService', () => {
  let service: CompanyTypeMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyTypeMasterService],
    }).compile();

    service = module.get<CompanyTypeMasterService>(CompanyTypeMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
