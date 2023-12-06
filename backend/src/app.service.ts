import { Injectable } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { DBRepository } from './db/db.repository';
import { ConverterService } from './converter/converter.service';
import { CarbonEmissionResponseDto } from './dto/carbon-emission-response.dto';
import { ExecutionResult } from './db/entity/execution-result.entity';
import { ConfigService } from '@nestjs/config';

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
    const cores = configService.get<number>('NUM_OF_CORES');
    const power = configService.get<number>('POWER_OF_CORE');
    const ci = configService.get<number>('CARBON_INTENSITY');

    const pue = configService.get<number>('PUE');
    this.config = { powerOfCores: cores * power, pue, ci };
  }

  async calculateEmission(input: string) {
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
    );
  }

  async applyGreenAlgorithm(execution: ExecutionResult): Promise<number> {
    const runtime = execution.runtime / 60 / 60 / 1000; // ms to h
    const memUsage = execution.memUsage / 1024 / 1024; // B to GB

    return (
      (this.config.powerOfCores * execution.coreUsage + memUsage * 0.3725) *
      runtime *
      this.config.pue *
      0.001 *
      this.config.ci
    );
  }
}
