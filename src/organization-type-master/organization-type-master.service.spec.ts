import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationTypeMasterService } from './organization-type-master.service';

describe('OrganizationTypeMasterService', () => {
  let service: OrganizationTypeMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationTypeMasterService],
    }).compile();

    service = module.get<OrganizationTypeMasterService>(OrganizationTypeMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
