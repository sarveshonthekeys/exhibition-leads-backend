import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationMasterController } from './organization-master.controller';
import { OrganizationMasterService } from './organization-master.service';

describe('OrganizationMasterController', () => {
  let controller: OrganizationMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationMasterController],
      providers: [OrganizationMasterService],
    }).compile();

    controller = module.get<OrganizationMasterController>(OrganizationMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
