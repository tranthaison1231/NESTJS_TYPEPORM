import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Logger,
  HttpService,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';
import { TopupDto } from './dto/cards.dto';
import { twilio } from '../../config/twilio.config';

@Injectable()
export class CardsService extends TypeOrmCrudService<Card> {
  constructor(
    @InjectRepository(Card) cardsService: Repository<Card>,
    private httpService: HttpService,
  ) {
    super(cardsService);
  }

  async payment(id: string): Promise<Card> {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    if (card.amount === 0) {
      const content = 'Not enought money';
      twilio.messages
        .create({
          body: 'Not enough money, please contact admin to topup your pocket',
          from: '+19798595754',
          to: `+84${card.phoneNumber.slice(1)}`,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.error(err));
      throw new NotAcceptableException('User is not enough money for paying');
    }
    card.amount -= 2000;
    await card.save();
    return card;
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
