import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.transactions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserDto;

  @ManyToOne(() => Trip, (trip) => trip.transactions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  trip: Trip;
}
