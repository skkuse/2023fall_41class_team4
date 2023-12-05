import { ExecutionStatus } from 'src/db/execution-status.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Code } from './code.entity';

@Entity({ name: 'execution_result' })
export class ExecutionResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: ExecutionStatus;

  @Column()
  runtime: number;

  @Column({ name: 'mem_usage' })
  memUsage: number;

  @Column({ name: 'core_usage' })
  coreUsage: number;
}
