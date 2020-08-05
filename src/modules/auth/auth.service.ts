import {
  Injectable,
  UnauthorizedException,
  Logger,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { sendEmail, renderEmailContent } from '@/utils/sendEmail';
import { generateConfirmEmailLink } from '@/utils/generateConfirmEmailLink';
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
import { UserRepository } from '../users/users.repository';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { EXPIRES_IN } from '../../environments';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createToken(payload: { username: string }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: EXPIRES_IN,
      accessToken: await this.jwtService.sign(payload),
    });
  }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<TokenPayloadDto> {
    const username = await this.userRepository.signUp(authCredentialsDto);
    const payload: JwtPayload = { username };
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return this.createToken(payload);
  }

  async signIn(signInDto: SignInDto): Promise<TokenPayloadDto> {
    const username = await this.userRepository.validateUserPassword(signInDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return this.createToken(payload);
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new ConflictException('Email not found');
    }
    const confirmEmailLink = await generateConfirmEmailLink(user.id);
    const resetPasswordTempalate = await renderEmailContent({
      template: 'reset-password',
      data: {
        name: user.username,
        url: confirmEmailLink,
      },
    });
    await sendEmail(email, resetPasswordTempalate);
  }

  async changePassword({
    verifyCode,
    password,
  }: ChangePasswordDto): Promise<User> {
    const userId = await redis.get(forgotPasswordPrefix + verifyCode);
    if (!userId) {
      throw new BadRequestException('Incorrect verify code or it is expired');
    }
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }
    await redis.del(forgotPasswordPrefix + verifyCode);
    user.password = await hashPassword(password, user.salt);
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
