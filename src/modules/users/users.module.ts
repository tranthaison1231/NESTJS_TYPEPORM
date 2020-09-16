import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { TransactionsModule } from '../transactions/transaction.module';
import { UserRepository } from './users.repository';
import { TripsModule } from '../trips/trips.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule,
    TransactionsModule,
    TripsModule,
  ],
})
export class UsersModule {}
