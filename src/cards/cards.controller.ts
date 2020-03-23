import {
  Controller,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
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
}
