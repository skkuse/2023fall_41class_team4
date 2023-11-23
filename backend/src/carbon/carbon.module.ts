import { Module } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CarbonController } from './carbon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Execution } from '../db/execution.entity';
import { ExecutionSubscriber } from '../db/execution.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Execution])],
  providers: [CarbonService, ExecutionSubscriber],
  controllers: [CarbonController],
})
export class CarbonModule {}
