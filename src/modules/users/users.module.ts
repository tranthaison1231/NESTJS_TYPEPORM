import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsModule } from '../transactions/transaction.module';
import { UserRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule,
    TransactionsModule,
  ],
})
export class UsersModule {}
