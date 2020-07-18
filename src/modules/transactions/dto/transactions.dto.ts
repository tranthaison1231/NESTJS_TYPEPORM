import {
  IsNotEmpty,
  IsEmail,
  IsArray,
  Min,
  Max,
  IsNumber,
  IsMobilePhone,
  IsUUID,
  IsDateString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/users.dto';
// import { TransactionType } from '../transactions.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(10000)
  @Max(1000000)
  amount: number;

  // @ApiProperty()
  // type: TransactionType;

  @ApiProperty()
  user: UserDto;
}

export class AnalyticFilterDto {
  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}
