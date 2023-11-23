import { ExecutionStatus } from './execution-status.enum';

export class ExecutionResult {
  status: ExecutionStatus;
  runtime: number;
  memoryUsage: number;
  cpuUsage: number;

  constructor(runtime: string, cpuUsage: string, memoryUsage: string) {
    this.status = ExecutionStatus.SUCCESS;
    this.runtime = Number(runtime);
    this.cpuUsage = Number(cpuUsage);
    this.memoryUsage = Number(memoryUsage);
  }
}
