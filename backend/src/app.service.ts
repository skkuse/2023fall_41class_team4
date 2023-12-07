import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { DBRepository } from './db/db.repository';
import { ConverterService } from './converter/converter.service';
import { CarbonEmissionResponseDto } from './dto/carbon-emission-response.dto';
import { ExecutionResult } from './db/entity/execution-result.entity';
import { ConfigService } from '@nestjs/config';
import {
  KILOBYTE_TO_MEGABYTE,
  SECOND_TO_MILLISECOND,
} from './converter/converter.constants';

@Injectable()
export class AppService {
  private readonly config;

  constructor(
    private readonly repository: DBRepository,
    private readonly javaCompilerService: JavaCompilerService,
    private readonly javaRunnerService: JavaRunnerService,
    private readonly converterService: ConverterService,
    configService: ConfigService,
  ) {
    const _cores = configService.get<number>('NUM_OF_CORES');
    const _power = configService.get<number>('POWER_OF_CORE');
    const CI = configService.get<number>('CARBON_INTENSITY');

    const PUE = configService.get<number>('PUE');
    this.config = { POC: _cores * _power, PUE, CI };
  }

  async calculateEmission(input: string) {
    const size = new Blob([input]).size;
    if (size > 4000) {
      throw new UnprocessableEntityException(
        '입력하는 코드의 사이즈는 4KB 이하여야 합니다.',
      );
    }
    const code = await this.repository.saveCode(input);

    await this.javaCompilerService.compile(code);
    const executionResult = await this.javaRunnerService.run(code);

    const emission = await this.applyGreenAlgorithm(executionResult);
    await this.repository.updateCode({
      id: code.id,
      emission,
      executionResult,
    });

    return new CarbonEmissionResponseDto(
      this.converterService.convertCarbonEmission(emission),
      executionResult.runtime * SECOND_TO_MILLISECOND,
      executionResult.memUsage / KILOBYTE_TO_MEGABYTE,
    );
  }

  async applyGreenAlgorithm(execution: ExecutionResult): Promise<number> {
    const runtime = execution.runtime / 60 / 60; // s to h
    const memUsage = execution.memUsage / 1024 / 1024; // KB to GB

    return (
      (this.config.POC * execution.coreUsage + memUsage * 0.3725) *
      runtime *
      this.config.PUE *
      0.001 *
      this.config.CI
    );
  }
}
