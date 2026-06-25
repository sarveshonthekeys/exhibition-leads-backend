import { Test, TestingModule } from '@nestjs/testing';
import { GvDisbursementMasterController } from './gv-disbursement-master.controller';
import { GvDisbursementMasterService } from './gv-disbursement-master.service';

describe('GvDisbursementMasterController', () => {
  let controller: GvDisbursementMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GvDisbursementMasterController],
      providers: [GvDisbursementMasterService],
    }).compile();

    controller = module.get<GvDisbursementMasterController>(GvDisbursementMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
