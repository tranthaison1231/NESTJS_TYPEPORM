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
import { Transaction } from './transactions.entity';
import { CreateTransactionDto } from './dto/transactions.dto';

@Injectable()
export class TransactionsService extends TypeOrmCrudService<Transaction> {
  private logger = new Logger('TransactionsService');

  constructor(
    @InjectRepository(Transaction) transactionsService: Repository<Transaction>,
  ) {
    super(transactionsService);
  }

  async addTransaction(createDto: CreateTransactionDto) {
    const transaction = new Transaction();
    const { amount, cardId } = createDto;
    transaction.amount = amount;
    transaction.cardId = cardId;
    try {
      await transaction.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a task for transactionID "${transaction.id}. Data: ${createDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
