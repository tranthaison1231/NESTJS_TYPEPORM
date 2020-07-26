import { ApiProperty } from '@nestjs/swagger';

export class CreateDriversDto {
  @ApiProperty()
  salary: number;

  @ApiProperty()
  user: string;
}
