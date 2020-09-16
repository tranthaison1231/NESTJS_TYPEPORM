import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { User } from '@/modules/users/users.entity';
import { GetUser } from '@/decorators/get-user.decorator';
import { TokenPayloadDto } from '@/modules/auth/dto/TokenPayloadDto';
import { UserDto } from '@/modules/users/dto/users.dto';
import {
  AuthCredentialsDto,
  ForgotPasswordDto,
  ChangePasswordDto,
  SignInDto,
  RefreshTokenDto,
} from '@/modules/auth/dto/auth-credentials.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/info')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @Post('/refresh-token')
  refreshToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenPayloadDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('/change-password')
  changePassword(
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    return this.authService.changePassword(changePasswordDto);
  }
}
