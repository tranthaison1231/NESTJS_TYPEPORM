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
  UseGuards,
} from '@nestjs/common';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transactions.entity';
import {
  CreateTransactionDto,
  AnalyticFilterDto,
} from './dto/transactions.dto';
import { Analytic, Predict } from './transactions.interface';
import { JwtAuthGuard } from '../../guards/jwt.guard';

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
      trip: { eager: true, allow: ['id', 'title'] },
    },
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  },
} as CrudOptions)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('api/transactions')
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
