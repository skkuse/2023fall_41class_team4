import { ModuleMetadata } from '@nestjs/common';

export interface ConverterModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<any>;
  inject?: any[];
}
