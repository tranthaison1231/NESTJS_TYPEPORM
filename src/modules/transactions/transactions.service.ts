import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getConnection } from 'typeorm';
import { Transaction } from './transactions.entity';
import {
  CreateTransactionDto,
  AnalyticFilterDto,
} from './dto/transactions.dto';
import { Analytic, Predict } from './transactions.interface';
import { predictData, ComputeSMA } from '../../utils/timeseries';
import { DATA_SET } from '../../data/dataset';

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
    const { amount, user } = createDto;
    transaction.amount = amount;
    transaction.user = user;
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

  async predict(): Promise<Predict[]> {
    const predict = await predictData();
    const sma = ComputeSMA(
      DATA_SET.map((e) => e.amount),
      12,
    );
    const ouput = [
      ...DATA_SET.map((e, index) => {
        return index > 10
          ? {
              ...e,
              sma: sma[index - 11],
            }
          : e;
      }),
      {
        date: '2020-07-07T17:00:00.000Z',
        predict,
      },
    ];
    return ouput;
  }

  async analytic(filterDto: AnalyticFilterDto): Promise<Analytic> {
    const value = await createQueryBuilder('transaction')
      .select('COUNT(id)', 'totalTransaction')
      .addSelect('SUM(amount)', 'totalAmount')
      .addSelect('COUNT(DISTINCT user_id)', 'totalCustomers')
      .where(
        `create_at between '${filterDto.startTime} 00:00:00' and '${filterDto.endTime} 23:00:00'`,
      )
      .getRawOne();
    const chart = await getConnection().query(`
        with a as( select generate_series('${filterDto.startTime}'::timestamp,'${filterDto.endTime}'::timestamp,'1 days') as date)
        select coalesce(sum(ad.amount), 0) as amount, a.date from public.transaction ad
        right join a on a.date = ad.create_at::TIMESTAMP::DATE
        group by a.date order by a.date
    `);

    return {
      totalAmount: +value.totalAmount,
      totalTransaction: +value.totalTransaction,
      totalCustomers: +value.totalCustomers,
      chart,
    };
  }
}
