import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';
import {
  CreateTransactionDto,
  AnalyticFilterDto,
} from './dto/transactions.dto';
import { Analytic, Predict } from './transactions.interface';

@Crud({
  model: {
    type: Transaction,
  },
  dto: {
    create: CreateTransactionDto,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    maxLimit: 100,
    limit: 10,
    alwaysPaginate: true,
    join: {
      user: { eager: true, allow: ['id', 'username'] },
    },
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  },
} as CrudOptions)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController implements CrudController<Transaction> {
  constructor(public service: TransactionsService) {}

  @ApiOperation({
    summary: 'Payment with card',
  })
  @Get('/analysis')
  async analytic(
    @Query(ValidationPipe) filterDto: AnalyticFilterDto,
  ): Promise<Analytic> {
    return this.service.analytic(filterDto);
  }

  @ApiOperation({
    summary: 'Predict',
  })
  @Get('/predict')
  async predict(): Promise<Predict[]> {
    return this.service.predict();
  }
}
