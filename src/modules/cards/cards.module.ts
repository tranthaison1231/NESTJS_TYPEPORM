import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsModule } from '../transactions/transaction.module';
import { CardRepository } from './cards.repository';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    TypeOrmModule.forFeature([CardRepository]),
    HttpModule,
    TransactionsModule,
  ],
})
export class CardsModule {}
