import { Injectable } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { CodeService } from './code/code.service';
import { ConverterService } from './converter/converter.service';

@Injectable()
export class AppService {
  constructor(
    private readonly codeService: CodeService,
    private readonly javaCompilerService: JavaCompilerService,
    private readonly javaRunnerService: JavaRunnerService,
    private readonly converterService: ConverterService,
  ) {}

  async calculateEmission(input: string) {
    const code = await this.codeService.saveCode(input);
    // FIXME: compile result 넘겨주도록 수정
    await this.javaCompilerService.compile(code);
    const executionResult = await this.javaRunnerService.run(code);

    const emission = await this.codeService.calculateEmission(executionResult);
    await this.codeService.updateEmission({ id: code.id, emission: emission });

    return this.converterService.convertCarbonEmission(emission);
  }
}
