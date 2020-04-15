import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../shared/base.entity';

@Entity()
export class Card extends BaseModel {
  @Column()
  amount: number;

  @Column({ default: 0 })
  name: string;

  @Column()
  email: string;
}
