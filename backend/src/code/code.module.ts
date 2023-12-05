import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from 'src/db/code.entity';
import { ExecutionResult } from 'src/db/execution-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code, ExecutionResult])],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
