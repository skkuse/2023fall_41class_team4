import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { Code } from 'src/db/code.entity';
import { CompileError } from 'src/common/java-error.exception';
import { mkdir, writeFile } from 'fs/promises';

@Injectable()
export class JavaCompilerService {
  readonly baseDir = '/tmp/sandbox';
  readonly filename = 'Main.java';

  async compile(code: Code) {
    const path = `${this.baseDir}/${code.id}`;
    await this.writeFile(path, code.code);

    try {
      execSync(`javac -d ${path} ${path}/${this.filename}`);
    } catch (error) {
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
