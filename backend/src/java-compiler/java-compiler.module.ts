import { Module } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  providers: [JavaCompilerService],
  exports: [JavaCompilerService],
})
export class JavaCompilerModule {}
