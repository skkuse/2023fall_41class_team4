import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { Code } from 'src/db/code.entity';
import { CompileError } from 'src/dto/java-error.exception';
import { mkdir, writeFile } from 'fs/promises';
import { CodeService } from 'src/code/code.service';
import { ExecutionStatus } from 'src/db/execution-status.enum';

@Injectable()
export class JavaCompilerService {
  private readonly baseDir = '/tmp/sandbox';
  private readonly filename = 'Main.java';

  constructor(private readonly codeService: CodeService) {}

  async compile(code: Code) {
    const path = `${this.baseDir}/${code.id}`;
    await this.writeFile(path, code.code);

    try {
      execSync(`javac -d ${path} ${path}/${this.filename}`);
    } catch (error) {
      await this.codeService.saveExecutionResult(
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
