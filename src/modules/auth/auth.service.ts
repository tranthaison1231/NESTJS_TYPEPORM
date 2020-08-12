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
  RefreshTokenDto,
} from './dto/auth-credentials.dto';
import { JwtPayload } from '../../shared/jwt/jwt-payload.interface';
import { UserRepository } from '../users/users.repository';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { EXPIRES_IN } from '../../environments';
import { User } from '../users/users.entity';
import { RefreshTokenRepository } from '../refresh-token/refresh-token.repository';
import { CreateToken } from './auth.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async createToken({ userId, token }: CreateToken): Promise<TokenPayloadDto> {
    const accessToken = await this.jwtService.sign({ userId });
    const refreshToken = await this.refreshTokenRepository.createOne(userId);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify({ userId })}`,
    );
    return new TokenPayloadDto({
      tokenType: 'Bearer',
      expiresIn: EXPIRES_IN,
      accessToken,
      refreshToken,
    });
  }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<TokenPayloadDto> {
    const userId = await this.userRepository.signUp(authCredentialsDto);
    return this.createToken({ userId });
  }

  async signIn(signInDto: SignInDto): Promise<TokenPayloadDto> {
    const userId = await this.userRepository.validateUserPassword(signInDto);
    if (!userId) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { userId };

    return this.createToken({ userId });
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
    await sendEmail({
      html: resetPasswordTempalate,
      to: email,
      subject: '[Bus Bus] Reset Password',
      text: 'Bạn muốn thay đổi mật khẩu',
    });
  }

  async refreshToken({ token, userId }: RefreshTokenDto) {
    const refreshObject = await this.refreshTokenRepository.findOne({
      userId,
      token,
    });
    if (!refreshObject) {
      throw new UnauthorizedException('Refresh token not found or not valid');
    }
    try {
      await this.refreshTokenRepository.delete({ id: refreshObject.id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
