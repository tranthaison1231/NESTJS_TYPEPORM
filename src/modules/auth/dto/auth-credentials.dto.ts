import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsJWT,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from '@/utils/classVaidator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @IsPassword()
  password: string;
}

export class AuthCredentialsDto extends SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsJWT()
  token: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsUUID()
  verifyCode: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @IsPassword()
  password: string;
}
