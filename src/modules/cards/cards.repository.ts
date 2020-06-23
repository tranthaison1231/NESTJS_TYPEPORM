import { Repository, EntityRepository } from 'typeorm';
import {
  Logger,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  HttpService,
} from '@nestjs/common';
import { Card } from './cards.entity';

import { TopupDto } from './dto/cards.dto';
import { TransactionsService } from '../transactions/transactions.service';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  private logger = new Logger('CardRepository');

  async getTopClient(): Promise<Card[]> {
    try {
      const cards = await this.createQueryBuilder('card')
        .select()
        .orderBy('total_transaction', 'DESC')
        .limit(5)
        .getMany();
      return cards;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async topup(id: string, topupDto: TopupDto): Promise<Card> {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    card.amount += topupDto.amount;
    await card.save();
    return card;
  }
}
