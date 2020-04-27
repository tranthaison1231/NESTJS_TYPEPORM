import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsModule } from '../transactions/transaction.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [TypeOrmModule.forFeature([Card]), HttpModule, TransactionsModule],
})
export class CardsModule {}
