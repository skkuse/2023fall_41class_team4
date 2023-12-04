import { Injectable } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';
import { CodeService } from './code/code.service';
import { ConverterService } from './converter/converter.service';
import { CarbonEmissionResponseDto } from './dto/carbon-emission-response.dto';

@Injectable()
export class AppService {
    readonly OK_STATUS = 'OK';
    readonly COMPILE_ERROR_STATUS = 'COMPILE_ERROR';
    readonly RUNTIME_ERROR_STATUS = 'RUNTIME_ERROR';
    constructor(
        private readonly codeService: CodeService,
        private readonly javaCompilerService: JavaCompilerService,
        private readonly javaRunnerService: JavaRunnerService,
        private readonly converterService: ConverterService,
    ) { }

    async calculateEmission(input: string) {
        const code = await this.codeService.saveCode(input);

        // FIXME: compile result 넘겨주도록 수정
        // "0" : compile error, "1" : compile success
        const compileResult = await this.javaCompilerService.compile(code);

        // FIXME: compile error라면 src/process/result.txt 읽고 넘겨주기
        if (compileResult === '0') {

        }

        const executionResult = await this.javaRunnerService.run(code);

        const emission = await this.codeService.calculateEmission(executionResult);
        await this.codeService.updateEmission({ id: code.id, emission: emission });

        return new CarbonEmissionResponseDto(
            this.OK_STATUS,
            this.converterService.convertCarbonEmission(emission),
        );
    }
}
