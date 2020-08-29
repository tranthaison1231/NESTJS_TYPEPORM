import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { DriversService } from '@/modules/drivers/drivers.service';
import { Driver } from '@/modules/drivers/drivers.entity';
import { DriversController } from '@/modules/drivers/drivers.controller';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [TypeOrmModule.forFeature([Driver])],
  exports: [DriversService],
})
export class DriversModule {}
