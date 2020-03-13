import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  Column,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from '@/products/product.entity';
import { BaseModel } from '@/shared/base.entity';
import { Company } from '@/companies/companies.entity';

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

  @ManyToOne(
    type => Company,
    company => company.users,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  company: Company;
}
