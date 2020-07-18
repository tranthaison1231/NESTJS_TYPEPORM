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
import { User } from './users.entity';

import { TopupDto, UserDto } from './dto/users.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { hashPassword, comparePassword } from '../../utils/password';
import {
  SignInDto,
  AuthCredentialsDto,
} from '../auth/dto/auth-credentials.dto';
import { ERROR_CODE } from '../../constants/error-code';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async topup(id: string, topupDto: TopupDto): Promise<UserDto> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    user.amount += topupDto.amount;

    await user.save();
    return new UserDto(user);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password, email } = authCredentialsDto;
    const user = new User();
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
