import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from 'src/db/entity/code.entity';
import { ExecutionResult } from 'src/db/entity/execution-result.entity';
import { DBRepository } from './db.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Code, ExecutionResult])],
  providers: [DBRepository],
  exports: [DBRepository],
})
export class DBModule {}
