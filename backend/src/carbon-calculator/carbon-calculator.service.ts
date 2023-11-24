import { Injectable } from '@nestjs/common';
import { ExecutionResult } from 'src/java-runner/execution-result.domain';

@Injectable()
export class CarbonCalculatorService {
  readonly GB_TO_KB = 1000000;
  readonly KW_TO_W = 1000;
  readonly CARBON_INTENSITY = 436;

  async calculate(executionResut: ExecutionResult): Promise<number> {
    const t = executionResut.runtime;
    const n_c = 1;
    const p_c = 11.3;
    const u_c = executionResut.cpuUsage;
    const n_m = executionResut.memoryUsage / this.GB_TO_KB;
    const p_m = 0.32375;
    const pue = 1.2;

    return (
      (t * n_c * p_c * u_c * n_m * p_m * pue * this.CARBON_INTENSITY) /
      this.KW_TO_W
    );
  }
}
