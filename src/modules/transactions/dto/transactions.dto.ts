import { IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/users.dto';
import { Trip } from '../../trips/trips.entity';
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

  @ApiProperty()
  trip: Trip;
}

export class AnalyticFilterDto {
  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}
