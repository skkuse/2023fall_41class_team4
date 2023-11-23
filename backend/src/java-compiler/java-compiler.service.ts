import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class JavaCompilerService {
  readonly tempDirectory = './temp';
  readonly javaFileName = 'Main.java';

  async compile(code: string) {
    await this.writeFile(code);

    execSync(`javac ${this.tempDirectory}/${this.javaFileName}`);
  }

  private async writeFile(code: string) {
    if (!existsSync(this.tempDirectory)) {
      mkdirSync(this.tempDirectory);
    }
    writeFileSync(`${this.tempDirectory}/${this.javaFileName}`, code);
  }
}
