import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  Column,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/product.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
