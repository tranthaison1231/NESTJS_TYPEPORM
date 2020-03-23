import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class CardsService extends TypeOrmCrudService<Card> {
  constructor(@InjectRepository(Card) cardsService: Repository<Card>) {
    super(cardsService);
  }
}
