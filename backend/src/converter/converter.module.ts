import { DynamicModule, Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConverterModuleAsyncOptions } from './converter-options.interface';
import { CONVERTER_CONFIG } from './converter.constants';

@Module({
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {
  static forRootAsync(options: ConverterModuleAsyncOptions): DynamicModule {
    return {
      module: ConverterModule,
      imports: options.imports || [],
      providers: [
        {
          provide: CONVERTER_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
    };
  }
}
