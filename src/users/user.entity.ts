import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  Column,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from '@/products/product.entity';
import { BaseModel } from '@/shared/base.entity';

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Product,
    product => product.user,
    { eager: true },
  )
  products: Product[];
}
