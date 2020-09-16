import { Column, Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';

import { BaseModel } from '../../shared/base.entity';
import { User } from '../users/users.entity';
import { Trip } from '../trips/trips.entity';

@Entity()
export class Driver extends BaseModel {
  @Column()
  salary: number;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @OneToMany((type) => Trip, (trip) => trip.driver, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  trips: Trip[];
}
