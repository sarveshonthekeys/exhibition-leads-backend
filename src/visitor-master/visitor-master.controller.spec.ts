import { Test, TestingModule } from '@nestjs/testing';
import { VisitorMasterController } from './visitor-master.controller';
import { VisitorMasterService } from './visitor-master.service';

describe('VisitorMasterController', () => {
  let controller: VisitorMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitorMasterController],
      providers: [VisitorMasterService],
    }).compile();

    controller = module.get<VisitorMasterController>(VisitorMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
