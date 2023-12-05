import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionResult } from '../db/execution-result.entity';
import { Repository } from 'typeorm';
import { execSync } from 'child_process';
import { ExecutionStatus } from 'src/db/execution-status.enum';
import { Code } from 'src/db/code.entity';
import {
  LimitExceededException,
  RuntimeErrorException,
} from 'src/common/java-error.exception';
import { ConfigService } from '@nestjs/config';

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
    const result = execSync(
      `cd ${path} && ../run ${this.filename} 2>/dev/null`,
    ).toString();

    const [status, runtime, memUsage] = result.trim().split(' ');
    console.log(status, runtime, memUsage);

    switch (Number(status)) {
      case 1:
        // FIXME: 런타임 에러 발생 시 에러 내용 받아오기
        throw new RuntimeErrorException(runtime);
      case 2:
        throw new LimitExceededException('시간');
      case 3:
        throw new LimitExceededException('메모리');
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
