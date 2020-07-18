import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Logger,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthCredentialsDto,
  ForgotPasswordDto,
  ChangePasswordDto,
  SignInDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from '../../decorators/get-user.decorator';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserDto } from '../users/dto/users.dto';
import { User } from '../users/users.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getInfo(@GetUser() user: User): UserDto {
    return new UserDto(user);
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<TokenPayloadDto> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<TokenPayloadDto> {
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
