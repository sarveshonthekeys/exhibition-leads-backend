import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationTypeMasterController } from './organization-type-master.controller';
import { OrganizationTypeMasterService } from './organization-type-master.service';

describe('OrganizationTypeMasterController', () => {
  let controller: OrganizationTypeMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationTypeMasterController],
      providers: [OrganizationTypeMasterService],
    }).compile();

    controller = module.get<OrganizationTypeMasterController>(OrganizationTypeMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
