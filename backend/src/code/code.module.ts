import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionResult } from '../db/execution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionResult])],
  providers: [CodeService],
  exports: [CodeService]
})
export class CodeModule {}
