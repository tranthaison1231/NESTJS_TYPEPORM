import {
  Column,
  Entity,
  ManyToOne,
  EventSubscriber,
  Repository,
  InsertEvent,
  EntitySubscriberInterface,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IsDateString } from 'class-validator';
import { BaseModel } from '../../shared/base.entity';
import { Card } from '../cards/cards.entity';
// import { TransactionType } from './transactions.enum';

@Entity()
export class Transaction extends BaseModel {
  @Column()
  amount: number;

  // @Column()
  // type: TransactionType;

  @ManyToOne(() => Card, (card) => card.transactions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
