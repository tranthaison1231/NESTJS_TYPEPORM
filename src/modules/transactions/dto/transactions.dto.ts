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
import { Card } from '../../cards/cards.entity';
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
  card: Card;
}

export class AnalyticFilterDto {
  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}
