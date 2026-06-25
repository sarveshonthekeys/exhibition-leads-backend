import { Test, TestingModule } from '@nestjs/testing';
import { StateMasterService } from './state-master.service';

describe('StateMasterService', () => {
  let service: StateMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateMasterService],
    }).compile();

    service = module.get<StateMasterService>(StateMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
