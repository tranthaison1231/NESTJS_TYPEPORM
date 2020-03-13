import { IsNotEmpty, IsEmail, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompaniesDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class CreateUsersDto {
  @ApiProperty()
  @IsArray()
  userID: string[];
}
