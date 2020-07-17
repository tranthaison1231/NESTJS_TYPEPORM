import {
  IsNotEmpty,
  IsEmail,
  IsArray,
  Min,
  Max,
  IsNumber,
  IsMobilePhone,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user.interface';
import { Card } from '../cards.entity';
import { BaseDto } from '../../../shared/base.dto';

export class CreateCardsDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(10000)
  @Max(1000000)
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMobilePhone('vi-VN')
  phoneNumber: string;
}

export class CardsDto {
  email: string;
}

export class TopupDto {
  @ApiProperty()
  @Min(10000)
  @Max(1000000)
  @IsNumber()
  amount: number;
}

export class UserDto extends BaseDto {
  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional({ enum: UserRole })
  role: UserRole;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  avatar: string;

  @ApiPropertyOptional()
  phoneNumber: string;

  constructor(user: Card) {
    super(user);
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    this.phoneNumber = user.phoneNumber;
  }
}
