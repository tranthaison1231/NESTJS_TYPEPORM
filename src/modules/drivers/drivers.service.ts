import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './drivers.entity';

@Injectable()
export class DriversService extends TypeOrmCrudService<Driver> {
  private logger = new Logger('DriversService');

  constructor(@InjectRepository(Driver) driversService: Repository<Driver>) {
    super(driversService);
  }
}
