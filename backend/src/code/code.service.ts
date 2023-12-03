import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecutionResult } from '../db/execution-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from 'src/db/code.entity';

@Injectable()
export class CodeService {
  private readonly config;

  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    configService: ConfigService,
  ) {
    const cores = configService.get<number>('NUM_OF_CORES');
    const power = configService.get<number>('POWER_OF_CORE');

    const pue = configService.get<number>('PUE');
    this.config = { powerOfCores: cores * power, pue };
  }

  async saveCode(input: string): Promise<Code> {
    const size = new Blob([input]).size;
    if (size > 4000) {
      throw new UnprocessableEntityException(
        '입력하는 코드의 사이즈는 4KB 이하여야 합니다.',
      );
    }
    const data = this.codeRepository.create({ code: input });
    return await this.codeRepository.save(data);
  }

  async calculateEmission(execution: ExecutionResult): Promise<number> {
    const runtime = execution.runtime / 60 / 60 / 1000; // ms to h
    const memUsage = execution.memUsage / 1024 / 1024; // B to GB

    return (
      (this.config.powerOfCores * execution.coreUsage + memUsage * 0.3725) *
      runtime *
      this.config.pue *
      0.001
    );
  }

  async updateEmission(code: Partial<Code>) {
    await this.codeRepository.update({ id: code.id }, { ...code });
  }
}
