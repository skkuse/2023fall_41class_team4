import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Execution } from '../db/execution.entity';
import { CarbonService } from 'src/carbon/carbon.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@EventSubscriber()
export class ExecutionSubscriber
  implements EntitySubscriberInterface<Execution>
{
  constructor(
    private readonly connection: Connection,
    private readonly carbonService: CarbonService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Execution;
  }

  afterInsert(event: InsertEvent<Execution>) {
  }
}
