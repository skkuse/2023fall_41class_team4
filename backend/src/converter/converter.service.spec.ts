import { Test, TestingModule } from '@nestjs/testing';
import { ConverterService } from './converter.service';
import {
  CONVERTER_CONFIG,
  HOUR_TO_MILLISECOND,
  KILO_TO_MILLI,
  MILLI,
} from './converter.constants';
import { CarbonEmissionConvertedResultDto } from '@app/dto/carbon-emission-converted-result.dto';

const config = {
  CI: 1,
  CARBON_EMISSIONS_OF_AVERAGE_PASSENGER_IN_EUROPE: 1,
  TV_CARBON_EMISSION_PER_HOUR: 1,
  SUBWAY_TRAVEL_DISTANCE_KILOMETER_PER_GCO2E: 1,
  APPLE_PRODUCTION_PER_GCO2E: 1,
};

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConverterService,
        {
          provide: CONVERTER_CONFIG,
          useFactory: () => {
            return config;
          },
        },
      ],
    }).compile();

    service = module.get<ConverterService>(ConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('converCarbonEmission', () => {
    const emission = 1;
    const expected = new CarbonEmissionConvertedResultDto(
      MILLI,
      KILO_TO_MILLI,
      HOUR_TO_MILLISECOND,
      KILO_TO_MILLI,
      KILO_TO_MILLI,
      MILLI,
    );

    it('should convert execution result', () => {
      const result = service.convert(emission);
      expect(result).toEqual(expected);
    });
  });
});
