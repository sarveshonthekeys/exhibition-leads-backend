import { Test, TestingModule } from '@nestjs/testing';
import { MenuAssignmentMasterController } from './menu-assignment-master.controller';
import { MenuAssignmentMasterService } from './menu-assignment-master.service';

describe('MenuAssignmentMasterController', () => {
  let controller: MenuAssignmentMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuAssignmentMasterController],
      providers: [MenuAssignmentMasterService],
    }).compile();

    controller = module.get<MenuAssignmentMasterController>(MenuAssignmentMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
