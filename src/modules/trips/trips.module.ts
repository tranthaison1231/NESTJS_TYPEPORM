import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripsService } from './trips.service';
import { Trip } from './trips.entity';
import { TripsController } from './trips.controller';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
  imports: [TypeOrmModule.forFeature([Trip])],
  exports: [TripsService],
})
export class TripsModule {}
