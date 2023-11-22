import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JavaCompilerService } from './java-compiler/java-compiler.service';
import { JavaRunnerService } from './java-runner/java-runner.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, JavaCompilerService, JavaRunnerService],
})
export class AppModule {}
