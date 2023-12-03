import { Module } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler.service';

@Module({
  providers: [JavaCompilerService],
  exports: [JavaCompilerService],
})
export class JavaCompilerModule {}
