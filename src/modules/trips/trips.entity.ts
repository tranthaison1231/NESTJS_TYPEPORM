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

// interface Location {
//   start: {
//     lng: number;
//     lat: number;
//   };
//   end: {
//     lng: number;
//     lat: number;
//   };
//   text: string;
// }

@Entity()
export class Trip extends BaseModel {
  @Column()
  amount: number;

  @Column()
  title: string;

  // @Column()
  // location: Location;
}
