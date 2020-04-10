import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/users/user.entity';
import {
  AuthCredentialsDto,
  SignInDto,
} from 'src/auth/dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { hashPassword, comparePassword } from '@/utils/password';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

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
      if (error.code === '23505') {
        // duplicate username && email
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException();
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

  async getAllUser(page: number, limit: number): Promise<Pagination<User>> {
    const query = this.createQueryBuilder('user');
    try {
      const users = await paginate(query, {
        page,
        limit: limit > 100 ? 100 : limit,
        route: 'https://netjs.herokuapp.com/users',
      });
      return users;
    } catch (error) {
      this.logger.error(`Fail to get all users`);
      throw new InternalServerErrorException();
    }
  }
}
