import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSubscriber } from './transactions.entity';
import { TransactionsController } from './transaction.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionSubscriber,
    Transaction,
    {
      useValue: EntityManager,
      useClass: EntityManager,
      provide: EntityManager,
    },
  ],
  imports: [TypeOrmModule.forFeature([Transaction])],
  exports: [TransactionsService],
})
export class TransactionsModule {}
