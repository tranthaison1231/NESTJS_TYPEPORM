import { Injectable } from '@nestjs/common';
import {
  EventSubscriber,
  Repository,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { Transaction } from './transactions.entity';
import { User } from '../users/users.entity';

@EventSubscriber()
@Injectable()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction> {
  listenTo = () => Transaction;

  async afterInsert(event: InsertEvent<Transaction>) {
    const cardRepo: Repository<User> = event.connection.manager.getRepository<
      User
    >('user');

    const card = await cardRepo.findOne({ id: event.entity.user.id });
    card.totalTransaction += 1;
    card.amount -= 2000;
    await card.save();
    return card;
  }
}
