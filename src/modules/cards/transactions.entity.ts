import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../shared/base.entity';
import { Card } from './cards.entity';

@Entity()
export class Transaction extends BaseModel {
  @Column()
  amount: number;

  @ManyToOne((type) => Card, (card) => card.transactions, {
    eager: false,
    onDelete: 'CASCADE',
  })
  card: Card;
}
