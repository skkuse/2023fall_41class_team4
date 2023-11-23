import { Test, TestingModule } from '@nestjs/testing';
import { CarbonController } from './carbon.controller';

describe('CarbonController', () => {
  let controller: CarbonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonController],
    }).compile();

    controller = module.get<CarbonController>(CarbonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
