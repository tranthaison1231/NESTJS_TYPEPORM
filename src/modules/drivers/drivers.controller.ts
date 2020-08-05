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
import {
  ApiTags,
  ApiOperation,
  ApiBasicAuth,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Driver } from './drivers.entity';
import { DriversService } from './drivers.service';
import { CreateDriversDto } from './dto/drivers.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';

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
        allow: ['id', 'username', 'gender', 'phoneNumber', 'avatar', 'email'],
      },
      trips: { eager: true, allow: ['id'] },
    },
  },
} as CrudOptions)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Drivers')
@Controller('Drivers')
export class DriversController implements CrudController<Driver> {
  constructor(public service: DriversService) {}
}
