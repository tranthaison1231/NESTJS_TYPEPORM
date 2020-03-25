import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';

@Injectable()
export class CardsService extends TypeOrmCrudService<Card> {
  constructor(@InjectRepository(Card) cardsService: Repository<Card>) {
    super(cardsService);
  }

  async payment(id: string): Promise<Card> {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    if (card.amount === 0) {
      throw new NotAcceptableException('User is not enough money for paying');
    }
    card.amount -= 2000;
    await card.save();
    return card;
  }
}
