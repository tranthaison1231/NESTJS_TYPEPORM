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
  OneToOne,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IsDateString } from 'class-validator';
import { BaseModel } from '../../shared/base.entity';
import { User } from '../users/users.entity';
import { UserDto } from '../users/dto/users.dto';
import { Trip } from '../trips/trips.entity';
// import { TransactionType } from './transactions.enum';

@Entity()
export class Transaction extends BaseModel {
  @Column()
  amount: number;

  // @Column()
  // type: TransactionType;

  @ManyToOne((type) => User, (user) => user.transactions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserDto;

  @ManyToOne((type) => Trip, (trip) => trip.transactions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  trip: Trip;
}
