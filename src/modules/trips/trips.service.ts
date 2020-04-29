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
import { Trip } from './trips.entity';

@Injectable()
export class TripsService extends TypeOrmCrudService<Trip> {
  private logger = new Logger('TripsService');

  constructor(@InjectRepository(Trip) tripsService: Repository<Trip>) {
    super(tripsService);
  }
}
