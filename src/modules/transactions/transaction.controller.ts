import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Put,
} from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';
import { CreateTransactionDto } from './dto/transactions.dto';

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
  },
} as CrudOptions)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController implements CrudController<Transaction> {
  constructor(public service: TransactionsService) {}
}
