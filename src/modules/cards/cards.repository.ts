import { Repository, EntityRepository } from 'typeorm';
import {
  Logger,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  HttpService,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Card } from './cards.entity';

import { TopupDto } from './dto/cards.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { hashPassword, comparePassword } from '../../utils/password';
import {
  SignInDto,
  AuthCredentialsDto,
} from '../auth/dto/auth-credentials.dto';
import { ERROR_CODE } from '../../constants/error-code';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  private logger = new Logger('CardRepository');

  async topup(id: string, topupDto: TopupDto): Promise<Card> {
    const card = await this.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    card.amount += topupDto.amount;

    await card.save();
    return card;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password, email } = authCredentialsDto;
    const user = new Card();
    user.email = email;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await hashPassword(password, user.salt);
    try {
      await user.save();
      return user.username;
    } catch (error) {
      if (error.code === ERROR_CODE.CONFLICT) {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async validateUserPassword(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.findOne({ username });
    if (user && (await comparePassword(password, user.password))) {
      return user.username;
    }
    return null;
  }
}
