import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Execution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpuTime: number;

  @Column()
  memUsage: number;

  @Column()
  coreUsage: number;
}
