import { Test, TestingModule } from '@nestjs/testing';
import { VisitorDetailsService } from './visitor-details.service';

describe('VisitorDetailsService', () => {
  let service: VisitorDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitorDetailsService],
    }).compile();

    service = module.get<VisitorDetailsService>(VisitorDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
