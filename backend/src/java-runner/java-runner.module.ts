import { Module } from '@nestjs/common';
import { JavaRunnerService } from './java-runner.service';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [CodeModule],
  providers: [JavaRunnerService],
  exports: [JavaRunnerService],
})
export class JavaRunnerModule {}
