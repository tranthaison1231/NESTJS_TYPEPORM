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
  UseGuards,
} from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudOptions,
  ParsedRequest,
  Override,
  CrudRequest,
} from '@nestjsx/crud';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUsersDto, TopupDto, UserDto, PaymentDto } from './dto/users.dto';
import { nexmo } from '../../config/nexmo.config';

@Crud({
  model: {
    type: User,
  },
  dto: {
    update: CreateUsersDto,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase'],
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
    cache: 2000,
    alwaysPaginate: true,
    join: {
      transactions: { eager: true },
      'transactions.trip': { eager: true, allow: ['id', 'title'] },
    },
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  },
} as CrudOptions)
@ApiTags('Users')
@Controller('api/users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @ApiOperation({
    summary: 'Payment',
  })
  @Post(':id/pay')
  payment(@Param('id', ParseUUIDPipe) paymentDto: PaymentDto): Promise<void> {
    return this.service.payment(paymentDto);
  }

  @Post()
  sendSMS(): void {
    nexmo.verify.request(
      {
        number: '84901989847',
        brand: 'Nexmo',
        code_length: '4',
      },
      (err, result) => {
        console.log(err || result);
      },
    );
  }

  @ApiOperation({
    summary: 'Topup with User',
  })
  @Put(':id/topup')
  @UsePipes(ValidationPipe)
  topup(
    @Body() topupDto: TopupDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto> {
    return this.service.topup(id, topupDto);
  }
}
