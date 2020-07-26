import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/users.entity';

interface Location {
  start: {
    lng: number;
    lat: number;
  };
  end: {
    lng: number;
    lat: number;
  };
  text: string;
}

export class CreateTripsDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  driver: string;
}
