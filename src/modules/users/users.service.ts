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
import { User } from './users.entity';
import { TopupDto, UserDto } from './dto/users.dto';
import { twilio } from '../../config/twilio.config';
import { TransactionsService } from '../transactions/transactions.service';
import { UserRepository } from './users.repository';
import { SPEED_SMS_SENDER, SPEED_SMS_AUTH_TOKEN } from '../../environments';
import * as messages from '../../language/messages.json';
import { TransactionType } from '../transactions/transactions.enum';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) usersService: Repository<User>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private transactionService: TransactionsService,
    private httpService: HttpService,
  ) {
    super(usersService);
  }

  async payment(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    if (user.amount < 2000) {
      await this.sendMessages(user.phoneNumber);
      throw new NotAcceptableException({
        messages: messages.notEnoughMoney,
      });
    } else {
      await this.transactionService.addTransaction({
        amount: 2000,
        user,
      });
    }
  }

  async sendMessages(phoneNumber: string): Promise<void> {
    const content =
      'Not enought money, please contact admin (+84915520981) to topup your pocket';
    if (phoneNumber) {
      this.httpService.post(
        `https://api.speedsms.vn/index.php/sms/send?access-token=${SPEED_SMS_AUTH_TOKEN}&to=+84${phoneNumber.slice(
          1,
        )}&content=${content}&type=4&sender=${SPEED_SMS_SENDER}`,
      );
    }
  }

  async topup(id: string, topupDto: TopupDto): Promise<UserDto> {
    return this.userRepository.topup(id, topupDto);
  }
}
