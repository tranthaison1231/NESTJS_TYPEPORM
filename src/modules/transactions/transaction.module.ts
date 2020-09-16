import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';
import { TransactionsController } from './transaction.controller';
import { TransactionSubscriber } from './transaction.subscriber';

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
