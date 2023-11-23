import { Injectable } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';

@Injectable()
export class AppService {
  constructor(
    private readonly javaRunnerService: JavaRunnerService,
    private readonly javaCompilerService: JavaCompilerService,
  ) {}

  async calculateEmission(code: string) {
    await this.javaCompilerService.compile(code);

    const executionResult = await this.javaRunnerService.run();

    // TODO carbon calculator 호출
  }
}
