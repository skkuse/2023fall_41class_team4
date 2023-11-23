import { Module } from '@nestjs/common';
import { JavaRunnerService } from './java-runner.service';

@Module({
  providers: [JavaRunnerService],
  exports: [JavaRunnerService]
})
export class JavaRunnerModule {}
