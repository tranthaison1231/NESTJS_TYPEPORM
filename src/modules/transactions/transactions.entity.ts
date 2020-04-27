import {
  Column,
  Entity,
  ManyToOne,
  EventSubscriber,
  Repository,
  InsertEvent,
  EntitySubscriberInterface,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseModel } from '../../shared/base.entity';
import { Card } from '../cards/cards.entity';

@Entity()
export class Transaction extends BaseModel {
  @Column()
  amount: number;

  @Column()
  cardId: string;
}

@EventSubscriber()
@Injectable()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction> {
  listenTo = () => Transaction;

  async afterInsert(event: InsertEvent<Transaction>) {
    console.log('12331');
    const cardRepo: Repository<Card> = event.connection.manager.getRepository<
      Card
    >('cards');
    const transactionRepo: Repository<Transaction> = event.connection.manager.getRepository<
      Transaction
    >('transactions');

    transactionRepo
      .count({
        where: { card: { id: event.entity.cardId } },
      })
      .then((count: number) => {
        cardRepo.update(
          { id: event.entity.cardId },
          { totalTransaction: count },
        );
      });
  }
}
