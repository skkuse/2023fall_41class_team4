import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { Emission } from '../db/entity/emission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Emission])],
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {}
