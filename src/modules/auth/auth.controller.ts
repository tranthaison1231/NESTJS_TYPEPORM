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
import { Card } from '../cards/cards.entity';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserDto } from '../cards/dto/cards.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getInfo(@GetUser() user: Card): UserDto {
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
  ): Promise<Card> {
    return this.authService.changePassword(changePasswordDto);
  }
}
