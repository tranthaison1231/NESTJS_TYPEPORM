import { ApiProperty } from '@nestjs/swagger';

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
  location: Location;
}
