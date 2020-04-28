import {
  Column,
  Entity,
  ManyToOne,
  EventSubscriber,
  Repository,
  InsertEvent,
  EntitySubscriberInterface,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IsDateString } from 'class-validator';
import { BaseModel } from '../../shared/base.entity';
import { Card } from '../cards/cards.entity';

@Entity()
export class Transaction extends BaseModel {
  @Column()
  amount: number;

  @Column()
  cardId: string;
}
