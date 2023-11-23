import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Execution } from '../db/execution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarbonService {
  private readonly config;

  constructor(
    @InjectRepository(Execution)
    private executionRepository: Repository<Execution>,
    configService: ConfigService,
  ) {
    const cores = configService.get<number>('NUM_OF_CORES');
    const power = configService.get<number>('POWER_OF_CORE');

    const pue = configService.get<number>('PUE');
    this.config = { powerOfCores: cores * power, pue };
  }

  async calculateEmission(executionId: number): Promise<number> {
    const execution: Execution = await this.executionRepository.findOneBy({
      id: executionId,
    });

    const cpuTime = execution.cpuTime / 60 / 60 / 1000; // ms to h
    const memUsage = execution.memUsage / 1024 / 1024; // B to GB

    // TODO: p_m 이렇게 계산하는 거 맞는지?
    return (
      (this.config.powerOfCores * execution.coreUsage + memUsage * 0.3725) *
      cpuTime *
      this.config.pue *
      0.001
    );
  }
}
