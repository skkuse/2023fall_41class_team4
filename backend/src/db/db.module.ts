import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from 'src/db/entity/code.entity';
import { ExecutionResult } from 'src/db/entity/execution-result.entity';
import { DBRepository } from './db.repository';
import { Emission } from './entity/emission.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Code, ExecutionResult, Emission]),
  ],
  providers: [DBRepository],
  exports: [DBRepository],
})
export class DBModule {}
