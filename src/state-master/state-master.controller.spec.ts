import { Test, TestingModule } from '@nestjs/testing';
import { StateMasterController } from './state-master.controller';
import { StateMasterService } from './state-master.service';

describe('StateMasterController', () => {
  let controller: StateMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateMasterController],
      providers: [StateMasterService],
    }).compile();

    controller = module.get<StateMasterController>(StateMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
