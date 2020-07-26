import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { DriversService } from './drivers.service';
import { Driver } from './drivers.entity';
import { DriversController } from './Drivers.controller';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [TypeOrmModule.forFeature([Driver])],
  exports: [DriversService],
})
export class DriversModule {}
