import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from '@app/db/entity/code.entity';
import { ExecutionResult } from '@app/db/entity/execution-result.entity';
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
