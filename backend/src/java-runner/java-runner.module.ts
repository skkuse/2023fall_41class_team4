import { Module } from '@nestjs/common';
import { JavaRunnerService } from './java-runner.service';
import { ExecutionResult } from 'src/db/execution-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionResult])],
  providers: [JavaRunnerService],
  exports: [JavaRunnerService],
})
export class JavaRunnerModule {}
