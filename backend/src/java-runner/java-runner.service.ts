import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionResult } from '../db/execution-result.entity';
import { Repository } from 'typeorm';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { ExecutionStatus } from 'src/db/execution-status.enum';
import { Code } from 'src/db/code.entity';

@Injectable()
export class JavaRunnerService {
    readonly tempDirectory = './temp';
    readonly fileName = 'Main';
    // readonly resultFileName = 'result.txt';
    readonly resultFileName = 'src/process/result.txt';

    constructor(
        @InjectRepository(ExecutionResult)
        private executionRepository: Repository<ExecutionResult>,
    ) { }

    async run(code: Code): Promise<ExecutionResult> {
        // const command = `/usr/bin/time -f \"%e %P %M\" -o ${this.resultFileName} java -cp ${this.tempDirectory} ${this.fileName}`;
        const command = `src/process/run.sh ${this.tempDirectory}/${this.fileName}`;
        execSync(command);

        const resultFile = readFileSync(`${this.resultFileName}`, {
            encoding: 'utf-8',
        });

        // const [runtime, coreUsage, memUsage] = resultFile
        //     .toString()
        //     .trim()
        //     .split(' ');

        const [status, runtime, memUsage] = resultFile
            .toString()
            .trim()
            .split(' ');
        const coreUsage = 1;

        // TODO: 런타임 에러 처리하기
        if (status === '0') {

        }

        const executionResult = this.executionRepository.create({
            code,
            status: ExecutionStatus.SUCCESS,
            runtime: Number(runtime),
            coreUsage: Number(coreUsage.slice(0, -1)),
            memUsage: Number(memUsage),
        });
        await this.executionRepository.save(executionResult);

        return executionResult;
    }
}
