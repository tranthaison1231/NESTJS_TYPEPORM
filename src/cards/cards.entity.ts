import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from '@/shared/base.entity';

@Entity()
export class Card extends BaseModel {
  @Column()
  amount: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
