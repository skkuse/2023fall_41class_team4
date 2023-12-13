import { Injectable } from '@nestjs/common';
import { ExecutionResult } from '../db/entity/execution-result.entity';
import { execSync } from 'child_process';
import { ExecutionStatus, Status } from 'src/db/entity/execution-status.enum';
import { Code } from 'src/db/entity/code.entity';
import { KilledError, RuntimeError } from 'src/dto/java-error.exception';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs/promises';
import { DBRepository } from 'src/db/db.repository';

@Injectable()
export class JavaRunnerService {
  private readonly baseDir = '/tmp/sandbox';
  private readonly filename = 'Main';
  private readonly coreUsage: number;

  constructor(
    private readonly repository: DBRepository,
    configService: ConfigService,
  ) {
    this.coreUsage = configService.get<number>('CONST_CORE_USAGE');
  }

  async run(code: Code): Promise<ExecutionResult> {
    // 프로그램 실행
    const path = `${this.baseDir}/${code.id}`;
    const output = execSync(`cd ${path} && ../run ${this.filename}`).toString();

    // 실행 결과 파싱
    const [_status, _runtime, _memUsage] = output.trim().split(' ');
    const status = Number(_status);
    const runtime = _runtime === undefined ? -1 : Number(_runtime);
    const memUsage = _memUsage === undefined ? -1 : Number(_memUsage);

    // 실행 결과 저장
    const executionResult = await this.repository.saveExecutionResult(
      code.id,
      {
        status: ExecutionStatus[Status[status]],
        runtime,
        coreUsage: this.coreUsage,
        memUsage,
      },
      status !== 0, // 에러 발생 시 code 업데이트
    );

    // 에러 발생 시 예외 처리
    switch (status) {
      case Status.RUNTIME_ERROR:
        const message = (await readFile(`${path}/error.log`)).toString();
        throw new RuntimeError(message);
      case Status.TIME_LIMIT_EXCEEDED:
        throw new KilledError('시간');
    }
    return executionResult;
  }
}
