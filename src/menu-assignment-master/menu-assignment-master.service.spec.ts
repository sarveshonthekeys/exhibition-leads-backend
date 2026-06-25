import { Test, TestingModule } from '@nestjs/testing';
import { MenuAssignmentMasterService } from './menu-assignment-master.service';

describe('MenuAssignmentMasterService', () => {
  let service: MenuAssignmentMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuAssignmentMasterService],
    }).compile();

    service = module.get<MenuAssignmentMasterService>(MenuAssignmentMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
