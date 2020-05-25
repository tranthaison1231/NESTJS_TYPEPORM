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
import { Analytic } from './transactions.interface';

const DATA_EXAMPLE = [
  {
    tripID: '8652b269-c166-4050-984c-d62ae97f6e9a',
    month: 1,
    timeOfDay: '8h-12h',
    totalPeople: 9,
  },
  {
    tripID: '17c7fc67-d664-49d9-a88c-a9edb70e5fe6',
    month: 1,
    timeOfDay: '13h-17h',
    totalPeople: 200,
  },
  {
    tripID: '8652b269-c166-4050-984c-d62ae97f6e9a',
    month: 2,
    timeOfDay: '13h-17h',
    totalPeople: 200,
  },
  {
    tripID: '17c7fc67-d664-49d9-a88c-a9edb70e5fe6',
    month: 3,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: '17c7fc67-d664-49d9-a88c-a9edb70e5fe6',
    month: 4,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: '17c7fc67-d664-49d9-a88c-a9edb70e5fe6',
    month: 5,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: 'b0030ada-c141-4e61-8f99-4a62735ec7f6',
    month: 6,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: 'b0030ada-c141-4e61-8f99-4a62735ec7f6',
    month: 8,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 9,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 10,
    timeOfDay: '17h-21h',
    totalPeople: 100,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 11,
    timeOfDay: '17h-21h',
    totalPeople: 300,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 12,
    timeOfDay: '8h-12h',
    totalPeople: 100,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 12,
    timeOfDay: '17h-21h',
    totalPeople: 200,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 12,
    timeOfDay: '8h-12h',
    totalPeople: 100,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 1,
    timeOfDay: '8h-12h',
    totalPeople: 200,
  },
  {
    tripID: '761d95d9-3628-434c-9696-69b0ad05d6b7',
    month: 2,
    timeOfDay: '8h-12h',
    totalPeople: 300,
  },
];

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

  async prediction(): Promise<number> {
    return 15;
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
