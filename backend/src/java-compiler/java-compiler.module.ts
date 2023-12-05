import { Module } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler.service';
import { CodeModule } from 'src/code/code.module';

@Module({
  imports: [CodeModule],
  providers: [JavaCompilerService],
  exports: [JavaCompilerService],
})
export class JavaCompilerModule {}
