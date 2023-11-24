import { Injectable } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { CarbonCalculatorService } from './carbon-calculator/carbon-calculator.service';

@Injectable()
export class AppService {
  constructor(
    private readonly javaRunnerService: JavaRunnerService,
    private readonly javaCompilerService: JavaCompilerService,
    private readonly carbonCalculatorService: CarbonCalculatorService,
  ) {}

  async calculateEmission(code: string): Promise<number> {
    await this.javaCompilerService.compile(code);

    const executionResult = await this.javaRunnerService.run();

    const electricityConsumption =
      await this.carbonCalculatorService.calculate(executionResult);

    return electricityConsumption;
  }
}
