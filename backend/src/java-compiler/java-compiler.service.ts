import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Code } from 'src/db/code.entity';

@Injectable()
export class JavaCompilerService {
  readonly tempDirectory = './temp';
  readonly javaFileName = 'Main.java';

  async compile(code: Code) {
    await this.writeFile(code.code);

    execSync(`javac ${this.tempDirectory}/${this.javaFileName}`);

    // TODO: handle when compile failed
  }

  private async writeFile(code: string) {
    if (!existsSync(this.tempDirectory)) {
      mkdirSync(this.tempDirectory);
    }
    writeFileSync(`${this.tempDirectory}/${this.javaFileName}`, code);
  }
}
