import { Test, TestingModule } from '@nestjs/testing';
import { DistrictMasterController } from './district-master.controller';
import { DistrictMasterService } from './district-master.service';

describe('DistrictMasterController', () => {
  let controller: DistrictMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictMasterController],
      providers: [DistrictMasterService],
    }).compile();

    controller = module.get<DistrictMasterController>(DistrictMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
