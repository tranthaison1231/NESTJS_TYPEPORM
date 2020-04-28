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

@Crud({
  model: {
    type: Transaction,
  },
  dto: {
    create: CreateTransactionDto,
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
  ): Promise<{
    totalTransaction: string;
    totalAmount: string;
  }> {
    return this.service.analytic(filterDto);
  }
}
