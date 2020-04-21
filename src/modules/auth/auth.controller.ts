import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Logger,
  UseGuards,
  Get,
} from '@nestjs/common';
import { User } from '@/modules/users/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthCredentialsDto,
  ForgotPasswordDto,
  ChangePasswordDto,
  SignInDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from '../users/get-user-decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getInfo(@GetUser() user: User): { data: User } {
    return {
      data: user,
    };
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('/forgot-password')
  forgotPassword(
    @Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/change-password')
  changePassword(
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    return this.authService.changePassword(changePasswordDto);
  }
}
