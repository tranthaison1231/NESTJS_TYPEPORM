import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { Transaction } from './transactions.entity';
import {
  CreateTransactionDto,
  AnalyticFilterDto,
} from './dto/transactions.dto';
import { Analytic } from './transactions.interface';

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
      const response = await transaction.save();
      return response;
    } catch (error) {
      this.logger.error(
        `Failed to create a task for transactionID "${transaction.id}. Data: ${createDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async analytic(filterDto: AnalyticFilterDto): Promise<Analytic> {
    const value = await createQueryBuilder('transaction')
      .select('COUNT(id)', 'totalTransaction')
      .addSelect('SUM(amount)', 'totalAmount')
      .addSelect('COUNT(DISTINCT card_id)', 'totalCustomers')
      .where(
        `create_at between '${filterDto.startTime} 00:00:00' and '${filterDto.endTime} 23:00:00'`,
      )
      .getRawOne();

    return {
      totalAmount: +value.totalAmount,
      totalTransaction: +value.totalTransaction,
      totalCustomers: +value.totalCustomers,
    };
  }
}
