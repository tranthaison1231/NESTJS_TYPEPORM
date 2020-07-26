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
import { Driver } from './drivers.entity';
import { DriversService } from './drivers.service';
import { CreateDriversDto } from './dto/drivers.dto';

@Crud({
  model: {
    type: Driver,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: {
    create: CreateDriversDto,
  },
  query: {
    maxLimit: 100,
    limit: 10,
    alwaysPaginate: true,
    join: {
      user: {
        eager: true,
        allow: ['id', 'username', 'gender', 'phoneNumber', 'avatar'],
      },
      trips: { eager: true, allow: ['id'] },
    },
  },
} as CrudOptions)
@ApiTags('Drivers')
@Controller('Drivers')
export class DriversController implements CrudController<Driver> {
  constructor(public service: DriversService) {}
}
