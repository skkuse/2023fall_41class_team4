import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionResult } from '../db/execution-result.entity';
import { Repository } from 'typeorm';
import { execSync } from 'child_process';
import { ExecutionStatus } from 'src/db/execution-status.enum';
import { Code } from 'src/db/code.entity';
import { KilledError, RuntimeError } from 'src/common/java-error.exception';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';

@Injectable()
export class JavaRunnerService {
  private readonly baseDir = '/tmp/sandbox';
  private readonly filename = 'Main';
  private readonly coreUsage: number;

  constructor(
    @InjectRepository(ExecutionResult)
    private executionRepository: Repository<ExecutionResult>,
    configService: ConfigService,
  ) {
    this.coreUsage = configService.get<number>('CONST_CORE_USAGE');
  }

  async run(code: Code): Promise<ExecutionResult> {
    const path = `${this.baseDir}/${code.id}`;
    const output = execSync(
      `cd ${path} && ../run ${this.filename} 2>error.log`,
    ).toString();

    const [status, runtime, memUsage] = output.trim().split(' ');
    console.log(status, runtime, memUsage);

    switch (Number(status)) {
      case 1:
        const error = (await readFile(`${path}/error.log`)).toString();
        throw new RuntimeError(error);
      case 2:
        throw new KilledError('시간');
      case 3:
        throw new KilledError('메모리');
    }
    // TODO: status가 SUCCESS가 아닐 때에도 DB에 저장

    const executionResult = this.executionRepository.create({
      code,
      status: ExecutionStatus.SUCCESS,
      runtime: Number(runtime),
      coreUsage: this.coreUsage,
      memUsage: Number(memUsage),
    });
    await this.executionRepository.save(executionResult);

    return executionResult;
  }
}
