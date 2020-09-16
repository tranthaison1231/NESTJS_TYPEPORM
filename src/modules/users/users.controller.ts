import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudOptions } from '@nestjsx/crud';
import { nexmo } from '../../config/nexmo.config';
import { PaymentDto, TopupDto, UpdateUsersDto, UserDto } from './dto/users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  dto: {
    update: UpdateUsersDto,
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
