import { Test, TestingModule } from '@nestjs/testing';
import { IndustryTypeMasterController } from './industry-type-master.controller';
import { IndustryTypeMasterService } from './industry-type-master.service';

describe('IndustryTypeMasterController', () => {
  let controller: IndustryTypeMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndustryTypeMasterController],
      providers: [IndustryTypeMasterService],
    }).compile();

    controller = module.get<IndustryTypeMasterController>(IndustryTypeMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
