import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ExecutionResult } from './execution-result.entity';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @OneToOne(() => ExecutionResult)
  @JoinColumn({ name: 'execution_result_id' })
  executionResult!: ExecutionResult;

  @Column({ type: 'double' })
  emission!: number;
}
