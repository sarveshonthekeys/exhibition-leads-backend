import { Test, TestingModule } from '@nestjs/testing';
import { IndustryTypeMasterService } from './industry-type-master.service';

describe('IndustryTypeMasterService', () => {
  let service: IndustryTypeMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndustryTypeMasterService],
    }).compile();

    service = module.get<IndustryTypeMasterService>(IndustryTypeMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
