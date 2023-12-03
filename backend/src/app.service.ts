import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { CodeService } from './code/code.service';

@Injectable()
export class AppService {
  constructor(
    private readonly codeService: CodeService,
    private readonly javaCompilerService: JavaCompilerService,
    private readonly javaRunnerService: JavaRunnerService,
  ) {}

  async calculateEmission(input: string) {
    const size = new Blob([input]).size;
    if (size > 4000) {
      throw new UnprocessableEntityException(
        '입력하는 코드의 사이즈는 4KB 이하여야 합니다.',
      );
    }

    const code = await this.codeService.saveCode(input);
    // FIXME: compile result 넘겨주도록 수정
    await this.javaCompilerService.compile(code);
    const executionResult = await this.javaRunnerService.run(code);

    const emission = await this.codeService.calculateEmission(executionResult);
    await this.codeService.updateEmission({ id: code.id, emission: emission });

    // TODO: 실생활 변환 후 Response로 가공해서 return
  }
}
