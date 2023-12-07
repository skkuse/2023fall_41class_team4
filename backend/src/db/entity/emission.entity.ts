import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'emission' })
@Unique(['name'])
export class Emission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column({ type: 'double' })
  emission: number;
}
