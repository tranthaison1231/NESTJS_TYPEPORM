import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Logger,
  HttpService,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { Card } from './cards.entity';
import { TopupDto } from './dto/cards.dto';
import { twilio } from '../../config/twilio.config';
import { TransactionsService } from '../transactions/transactions.service';
import { CardRepository } from './cards.repository';
import { SPEED_SMS_SENDER, SPEED_SMS_AUTH_TOKEN } from '../../environments';
import * as messages from '../../language/messages.json';
@Injectable()
export class CardsService extends TypeOrmCrudService<Card> {
  private logger = new Logger('CardsService');

  constructor(
    @InjectRepository(Card) cardsService: Repository<Card>,
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
    private transactionService: TransactionsService,
    private httpService: HttpService,
  ) {
    super(cardsService);
  }

  async payment(id: string): Promise<void> {
    const card = await this.cardRepository.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    if (card.amount < 2000) {
      const content =
        'Not enought money, please contact admin (+84915520981) to topup your pocket';
      if (card.phoneNumber) {
        this.httpService.post(
          `https://api.speedsms.vn/index.php/sms/send?access-token=${SPEED_SMS_AUTH_TOKEN}&to=+84${card.phoneNumber.slice(
            1,
          )}&content=${content}&type=4&sender=${SPEED_SMS_SENDER}`,
        );
      }
      throw new NotAcceptableException({
        messages: messages.notEnoughMoney,
      });
    } else {
      await this.transactionService.addTransaction({
        amount: 2000,
        card,
      });
    }
  }

  async topup(id: string, topupDto: TopupDto): Promise<Card> {
    return this.cardRepository.topup(id, topupDto);
  }

  async getTopClient(): Promise<Card[]> {
    return this.cardRepository.getTopClient();
  }
}
