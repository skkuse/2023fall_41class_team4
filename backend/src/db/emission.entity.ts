import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'emission' })
export class Emission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  emission: number;
}
