import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DBRepository } from './db/db.repository';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { ConverterService } from './converter/converter.service';
import { ConfigService } from '@nestjs/config';
import { ExecutionResult } from './db/entity/execution-result.entity';
import { ExecutionStatus } from './db/entity/execution-status.enum';
import { UnprocessableEntityException } from '@nestjs/common';
import { Code } from './db/entity/code.entity';
import { CarbonEmissionConvertedResultDto } from './dto/carbon-emission-converted-result.dto';
import { CarbonEmissionResponseDto } from './dto/carbon-emission-response.dto';
import {
  KILOBYTE_TO_MEGABYTE,
  SECOND_TO_MILLISECOND,
} from './converter/converter.constants';

// mock values that are used in mocked functions
const executionResult: ExecutionResult = {
  id: 1,
  status: ExecutionStatus.SUCCESS,
  runtime: 60 * 60,
  memUsage: 1024 * 1024,
  coreUsage: 1,
};
const code: Code = {
  id: 1,
  code: `public class Main {
    public static void main(String[] args) {
      int[] numbers = {1, 2, 3};
      System.out.println(numbers[2]);
    }
  }`,
  emission: 1,
  executionResult: executionResult,
};
const converted: CarbonEmissionConvertedResultDto = {
  carbonFootPrint: 1,
  energy: 1,
  tvWatchingTime: 1,
  passengerCarMileage: 1,
  subwayTravelDistance: 1,
  appleProduction: 1,
};

// mock other services using external modules
const db = {
  saveCode: jest.fn().mockResolvedValue(code),
  updateCode: jest.fn(),
};
const compiler = { compile: jest.fn() };
const runner = { run: jest.fn().mockResolvedValue(executionResult) };
const converter = { convert: jest.fn().mockReturnValue(converted) };

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: DBRepository, useValue: db },
        { provide: JavaCompilerService, useValue: compiler },
        { provide: JavaRunnerService, useValue: runner },
        { provide: ConverterService, useValue: converter },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: () => 1,
          }),
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateEmission', () => {
    beforeEach(() => {
      db.saveCode.mockClear();
    });

    it('should return calculated emission', async () => {
      const spy = jest.spyOn(service, 'applyGreenAlgorithm');

      const result = await service.calculateEmission(code.code);
      expect(db.saveCode).toHaveBeenCalled();
      expect(compiler.compile).toHaveBeenCalled();
      expect(runner.run).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled;
      expect(db.updateCode).toHaveBeenCalled();
      expect(result).toEqual(
        new CarbonEmissionResponseDto(
          converted,
          executionResult.runtime * SECOND_TO_MILLISECOND,
          executionResult.memUsage / KILOBYTE_TO_MEGABYTE,
        ),
      );
    });

    it('should throw if input size exceeded limit', async () => {
      const longInput = 'a'.repeat(5000);
      await expect(service.calculateEmission(longInput)).rejects.toThrow(
        UnprocessableEntityException,
      );
      expect(db.saveCode).not.toHaveBeenCalled();
    });
  });

  describe('applyGreenAlgorithm', () => {
    it('should apply green algorithm correctly', () => {
      const result = service.applyGreenAlgorithm(executionResult);
      expect(result).toBe((1 + 0.3725) * 1 * 1 * 0.001 * 1);
    });
  });
});
