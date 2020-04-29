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
} from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Trip } from './trips.entity';
import { TripsService } from './trips.service';

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
  query: {
    maxLimit: 100,
    limit: 10,
    alwaysPaginate: true,
  },
} as CrudOptions)
@ApiTags('Trips')
@Controller('Trips')
export class TripsController implements CrudController<Trip> {
  constructor(public service: TripsService) {}
}
