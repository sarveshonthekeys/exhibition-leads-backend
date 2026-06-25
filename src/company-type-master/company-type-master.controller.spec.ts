import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTypeMasterController } from './company-type-master.controller';
import { CompanyTypeMasterService } from './company-type-master.service';

describe('CompanyTypeMasterController', () => {
  let controller: CompanyTypeMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyTypeMasterController],
      providers: [CompanyTypeMasterService],
    }).compile();

    controller = module.get<CompanyTypeMasterController>(CompanyTypeMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
