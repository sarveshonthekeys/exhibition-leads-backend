import { Test, TestingModule } from '@nestjs/testing';
import { DistrictMasterService } from './district-master.service';

describe('DistrictMasterService', () => {
  let service: DistrictMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistrictMasterService],
    }).compile();

    service = module.get<DistrictMasterService>(DistrictMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
