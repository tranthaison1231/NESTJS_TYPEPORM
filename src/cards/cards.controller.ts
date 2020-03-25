import { Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';
import { CreateCardsDto } from './dto/cards.dto';

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
})
@ApiTags('Cards')
@Controller('cards')
export class CardsController implements CrudController<Card> {
  constructor(public service: CardsService) {}

  @ApiOperation({
    summary: 'Payment with card',
  })
  @Put(':id/pay')
  payment(@Param('id', ParseUUIDPipe) id: string): Promise<Card> {
    return this.service.payment(id);
  }
}
