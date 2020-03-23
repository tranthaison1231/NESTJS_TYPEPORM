import { IsNotEmpty, IsEmail, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardsDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: string;
}
