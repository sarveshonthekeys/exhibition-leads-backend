import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationMasterService } from './organization-master.service';

describe('OrganizationMasterService', () => {
  let service: OrganizationMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationMasterService],
    }).compile();

    service = module.get<OrganizationMasterService>(OrganizationMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
