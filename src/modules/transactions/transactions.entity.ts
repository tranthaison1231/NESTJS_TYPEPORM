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
import { User } from '../users/users.entity';
import { UserDto } from '../users/dto/users.dto';
// import { TransactionType } from './transactions.enum';

@Entity()
export class Transaction extends BaseModel {
  @Column()
  amount: number;

  // @Column()
  // type: TransactionType;

  @ManyToOne(() => User, (user) => user.transactions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'card_id' })
  user: UserDto;
}
