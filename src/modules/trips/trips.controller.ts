import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Put,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Trip } from './trips.entity';
import { TripsService } from './trips.service';
import { CreateTripsDto } from './dto/trips.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Crud({
  model: {
    type: Trip,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: {
    create: CreateTripsDto,
    update: CreateTripsDto,
  },
  query: {
    maxLimit: 100,
    limit: 10,
    alwaysPaginate: true,
    join: {
      driver: { eager: true, allow: ['id', 'username'] },
      'driver.user': {
        eager: true,
        allow: ['username'],
      },
    },
  },
} as CrudOptions)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Trips')
@Controller('api/trips')
export class TripsController implements CrudController<Trip> {
  constructor(public service: TripsService) {}
}
