import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseModel } from '../../shared/base.entity';
import { Driver } from '../drivers/drivers.entity';
import { Transaction } from '../transactions/transactions.entity';

@Entity()
export class Trip extends BaseModel {
  @Column()
  amount: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @ManyToOne(() => Driver, (driver) => driver.trips, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  driver: Driver;

  @OneToMany(() => Transaction, (transaciton) => transaciton.trip, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
