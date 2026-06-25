import { Test, TestingModule } from '@nestjs/testing';
import { VisitorDetailsController } from './visitor-details.controller';
import { VisitorDetailsService } from './visitor-details.service';

describe('VisitorDetailsController', () => {
  let controller: VisitorDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorDetailsController],
      providers: [VisitorDetailsService],
    }).compile();

    controller = module.get<VisitorDetailsController>(VisitorDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
