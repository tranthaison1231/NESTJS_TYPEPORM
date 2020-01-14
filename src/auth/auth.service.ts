import {
  Injectable,
  UnauthorizedException,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import {
  AuthCredentialsDto,
  ForgotPasswordDto,
  ChangePasswordDto,
} from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { sendEmail } from '../utils/sendEmail';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { User } from 'src/users/user.entity';
// import { redis } from '../redis';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';
import { hashPassword } from '../utils/password';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }

  // async forgotPassword({ email }: ForgotPasswordDto): Promise<void> {
  //   const user = await this.userRepository.findOne({ email });
  //   if (user) {
  //     await sendEmail(email, await confirmEmailLink(user.id));
  //   } else {
  //     throw new ConflictException('Email not found');
  //   }
  // }

  // async changePassword({ token, password }: ChangePasswordDto): Promise<User> {
  //   const userId = await redis.get(forgotPasswordPrefix + token);
  //   if (!userId) {
  //     return null;
  //   }
  //   const user = await this.userRepository.findOne(userId);
  //   if (!user) {
  //     throw new ConflictException('User not found');
  //   }
  //   await redis.del(forgotPasswordPrefix + token);
  //   user.password = await hashPassword(password, user.salt);
  //   try {
  //     await user.save();
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException();
  //   }
  // }
}
