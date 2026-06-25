import { Test, TestingModule } from '@nestjs/testing';
import { RoleMasterService } from './role-master.service';

describe('RoleMasterService', () => {
  let service: RoleMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleMasterService],
    }).compile();

    service = module.get<RoleMasterService>(RoleMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
