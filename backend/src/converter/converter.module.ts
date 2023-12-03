import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Module({
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {}
