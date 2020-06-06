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

    const card = await cardRepo.findOne({ id: event.entity.card.id });
    card.totalTransaction += 1;
    card.amount -= 2000;
    await card.save();
    return card;
  }
}
