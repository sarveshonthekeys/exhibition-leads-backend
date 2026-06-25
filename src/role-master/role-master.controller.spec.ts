import { Test, TestingModule } from '@nestjs/testing';
import { RoleMasterController } from './role-master.controller';
import { RoleMasterService } from './role-master.service';

describe('RoleMasterController', () => {
  let controller: RoleMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleMasterController],
      providers: [RoleMasterService],
    }).compile();

    controller = module.get<RoleMasterController>(RoleMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
