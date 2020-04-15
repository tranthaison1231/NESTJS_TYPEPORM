import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [TypeOrmModule.forFeature([Card])],
})
export class CardsModule {}
