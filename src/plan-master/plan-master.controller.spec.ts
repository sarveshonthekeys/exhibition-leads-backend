import { Test, TestingModule } from '@nestjs/testing';
import { PlanMasterController } from './plan-master.controller';
import { PlanMasterService } from './plan-master.service';

describe('PlanMasterController', () => {
  let controller: PlanMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanMasterController],
      providers: [PlanMasterService],
    }).compile();

    controller = module.get<PlanMasterController>(PlanMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
