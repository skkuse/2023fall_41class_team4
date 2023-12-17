import { Module } from '@nestjs/common';
import { JavaCompilerService } from './java-compiler.service';
import { DBModule } from '@app/db/db.module';

@Module({
  imports: [DBModule],
  providers: [JavaCompilerService],
  exports: [JavaCompilerService],
})
export class JavaCompilerModule {}
