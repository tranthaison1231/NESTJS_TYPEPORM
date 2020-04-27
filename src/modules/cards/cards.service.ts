import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Logger,
  HttpService,
  Inject,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';
import { TopupDto } from './dto/cards.dto';
import { twilio } from '../../config/twilio.config';
import { SPEED_SMS_AUTH_TOKEN, SPEED_SMS_SENDER } from '../../environments';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class CardsService extends TypeOrmCrudService<Card> {
  constructor(
    @InjectRepository(Card) cardsService: Repository<Card>,
    private readonly transactionService: TransactionsService,
    private httpService: HttpService,
  ) {
    super(cardsService);
  }

  async payment(id: string): Promise<Card> {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    if (card.amount < 2000) {
      const content =
        'Not enought money, please contact admin (+84915520981) to topup your pocket';
      if (card?.phoneNumber) {
        this.httpService.post(
          `https://api.speedsms.vn/index.php/sms/send?access-token=${SPEED_SMS_AUTH_TOKEN}&to=+84${card.phoneNumber.slice(
            1,
          )}&content=${content}&type=4&sender=${SPEED_SMS_SENDER}`,
        );
      }
      throw new NotAcceptableException('User is not enough money for paying');
    }
    card.amount -= 2000;

    await this.transactionService.addTransaction({
      amount: 2000,
      cardId: id,
    });
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
