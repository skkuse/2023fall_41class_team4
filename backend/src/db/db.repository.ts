import { Injectable } from '@nestjs/common';
import { ExecutionResult } from '../db/entity/execution-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { Code } from '@app/db/entity/code.entity';
import { Emission } from './entity/emission.entity';

@Injectable()
export class DBRepository {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    @InjectRepository(ExecutionResult)
    private executionRepository: Repository<ExecutionResult>,
    @InjectRepository(Emission)
    private emissionRepository: Repository<Emission>,
  ) {}

  async saveCode(input: string): Promise<Code> {
    const data = this.codeRepository.create({ code: input });
    return await this.codeRepository.save(data);
  }

  async updateCode(code: Partial<Code>) {
    await this.codeRepository.update({ id: code.id }, { ...code });
  }

  async saveExecutionResult(
    id: number,
    result: Partial<ExecutionResult>,
    connect: boolean,
  ): Promise<ExecutionResult> {
    const data = this.executionRepository.create(result);
    const executionResult = await this.executionRepository.save(data);
    if (connect) {
      await this.updateCode({ id, executionResult: executionResult });
    }
    return executionResult;
  }

  async getEmissions(names: string[]) {
    const emissions = await this.emissionRepository.find({
      select: {
        name: true,
        emission: true,
      },
      where: {
        name: In(names),
      },
    });
    if (emissions.length !== names.length) {
      throw new EntityNotFoundError(Emission, names);
    }
    return emissions;
  }
}
