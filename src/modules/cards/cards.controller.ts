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
import { Card } from './cards.entity';
import { CardsService } from './cards.service';
import { CreateCardsDto, TopupDto } from './dto/cards.dto';

@Crud({
  model: {
    type: Card,
  },
  dto: {
    create: CreateCardsDto,
    update: CreateCardsDto,
    replace: CreateCardsDto,
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
@ApiTags('Cards')
@Controller('cards')
export class CardsController implements CrudController<Card> {
  constructor(public service: CardsService) {}

  @ApiOperation({
    summary: 'Payment with card',
  })
  @Post(':id/pay')
  payment(@Param('id', ParseUUIDPipe) id: string): Promise<Card> {
    return this.service.payment(id);
  }

  @ApiOperation({
    summary: 'Topup with card',
  })
  @Put(':id/topup')
  @UsePipes(ValidationPipe)
  topup(
    @Body() topupDto: TopupDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Card> {
    return this.service.topup(id, topupDto);
  }
}
