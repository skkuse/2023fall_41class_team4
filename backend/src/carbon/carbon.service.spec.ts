import { Test, TestingModule } from '@nestjs/testing';
import { CarbonService } from './carbon.service';

describe('CarbonService', () => {
  let service: CarbonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonService],
    }).compile();

    service = module.get<CarbonService>(CarbonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
