import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { Code } from '@app/db/entity/code.entity';
import { CompileError } from '@app/dto/java-error.exception';
import { mkdir, writeFile } from 'fs/promises';
import { ExecutionStatus } from '@app/db/entity/execution-status.enum';
import { DBRepository } from '@app/db/db.repository';

@Injectable()
export class JavaCompilerService {
  private readonly baseDir = '/tmp/sandbox';
  private readonly filename = 'Main.java';

  constructor(private readonly repository: DBRepository) {}

  async compile(code: Code) {
    const path = `${this.baseDir}/${code.id}`;
    await this.writeFile(path, code.code);

    try {
      execSync(`javac -encoding utf-8 ${path}/${this.filename}`);
    } catch (error) {
      await this.repository.saveExecutionResult(
        code.id,
        {
          status: ExecutionStatus.COMPILE_ERROR,
          runtime: -1,
          coreUsage: -1,
          memUsage: -1,
        },
        true, // code 업데이트
      );
      throw new CompileError(error.stderr.toString());
    }
  }

  private async writeFile(path: string, code: string) {
    if (!existsSync(path)) {
      await mkdir(path, { recursive: true });
    }
    await writeFile(`${path}/${this.filename}`, code);
  }
}
