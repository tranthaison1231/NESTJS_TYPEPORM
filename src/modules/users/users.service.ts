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
import * as messages from '@/language/messages.json';
import { SPEED_SMS_SENDER, SPEED_SMS_AUTH_TOKEN } from '@/environments';

import { User } from './users.entity';
import { TopupDto, UserDto } from './dto/users.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { UserRepository } from './users.repository';

import { TripsService } from '../trips/trips.service';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) usersService: Repository<User>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private transactionService: TransactionsService,
    private tripService: TripsService,
    private httpService: HttpService,
  ) {
    super(usersService);
  }

  async payment({ userId, tripId }): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    const trip = await this.tripService.findOne(tripId);
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    if (!trip) {
      throw new NotFoundException(`Trip with ID "${tripId}" not found`);
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
        trip,
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
