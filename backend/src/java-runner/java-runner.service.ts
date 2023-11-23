import { Injectable } from '@nestjs/common';
import { ExecutionResult } from './execution-result.domain';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

@Injectable()
export class JavaRunnerService {
  readonly tempDirectory = './temp';
  readonly fileName = 'Main';
  readonly resultFileName = 'result.txt';

  async run(): Promise<ExecutionResult> {
    const command = `/usr/bin/time -f \"%e %P %M\" -o ${this.resultFileName} java -cp ${this.tempDirectory} ${this.fileName}`;
    execSync(command);

    const resultFile = readFileSync(`${this.resultFileName}`, {
      encoding: 'utf-8',
    });

    const [runtime, cpuUsage, memoryUsage] = resultFile
      .toString()
      .trim()
      .split(' ');

    return new ExecutionResult(runtime, cpuUsage.slice(0, -1), memoryUsage);
  }
}
