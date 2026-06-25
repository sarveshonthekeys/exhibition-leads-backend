import { Test, TestingModule } from '@nestjs/testing';
import { SbuMasterController } from './sbu-master.controller';
import { SbuMasterService } from './sbu-master.service';

describe('SbuMasterController', () => {
  let controller: SbuMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SbuMasterController],
      providers: [SbuMasterService],
    }).compile();

    controller = module.get<SbuMasterController>(SbuMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
