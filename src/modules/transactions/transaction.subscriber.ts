import { Injectable } from '@nestjs/common';
import {
  EventSubscriber,
  Repository,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { Card } from '../cards/cards.entity';
import { Transaction } from './transactions.entity';

@EventSubscriber()
@Injectable()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction> {
  listenTo = () => Transaction;

  async afterInsert(event: InsertEvent<Transaction>) {
    const cardRepo: Repository<Card> = event.connection.manager.getRepository<
      Card
    >('card');
    const transactionRepo: Repository<Transaction> = event.connection.manager.getRepository<
      Transaction
    >('transaction');

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
