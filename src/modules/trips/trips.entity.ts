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
export class Trip extends BaseModel {
  @Column()
  amount: number;

  @Column()
  title: string;

  @Column()
  location: string;
}
