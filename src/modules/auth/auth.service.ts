import {
  Injectable,
  UnauthorizedException,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { sendEmail } from '@/utils/sendEmail';
import { confirmEmailLink } from '@/utils/confirmEmailLink';
import { redis } from '@/redis';
import { forgotPasswordPrefix } from '@/constants/redisPrefixes';
import { hashPassword } from '@/utils/password';
import {
  AuthCredentialsDto,
  ForgotPasswordDto,
  ChangePasswordDto,
  SignInDto,
} from './dto/auth-credentials.dto';
import { JwtPayload } from '../../shared/jwt/jwt-payload.interface';
import { CardRepository } from '../cards/cards.repository';
import { Card } from '../cards/cards.entity';
import { Token } from './auth.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(CardRepository)
    private cardRepository: CardRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Token> {
    const username = await this.cardRepository.signUp(authCredentialsDto);
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return {
      token: accessToken,
    };
  }

  async signIn(signInDto: SignInDto): Promise<Token> {
    const username = await this.cardRepository.validateUserPassword(signInDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return {
      token: accessToken,
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<void> {
    const user = await this.cardRepository.findOne({ email });
    if (user) {
      await sendEmail(email, await confirmEmailLink(user.id));
    } else {
      throw new ConflictException('Email not found');
    }
  }

  async changePassword({ token, password }: ChangePasswordDto): Promise<Card> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      return null;
    }
    const user = await this.cardRepository.findOne(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }
    await redis.del(forgotPasswordPrefix + token);
    user.password = await hashPassword(password, user.salt);
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
