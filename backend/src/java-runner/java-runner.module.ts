import { Module } from '@nestjs/common';
import { JavaRunnerService } from './java-runner.service';
import { DBModule } from '@app/db/db.module';

@Module({
  imports: [DBModule],
  providers: [JavaRunnerService],
  exports: [JavaRunnerService],
})
export class JavaRunnerModule {}
