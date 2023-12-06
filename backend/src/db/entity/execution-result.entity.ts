import { ExecutionStatus } from './execution-status.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'execution_result' })
export class ExecutionResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: ExecutionStatus;

  @Column({ type: 'double' })
  runtime: number;

  @Column({ name: 'mem_usage', type: 'bigint' })
  memUsage: number;

  @Column({ name: 'core_usage', type: 'double' })
  coreUsage: number;
}
