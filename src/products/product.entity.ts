import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { User } from 'src/users/user.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @Column()
  status: ProductStatus;

  @ManyToOne(
    type => User,
    user => user.products,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  user: User;

  @Column()
  userId: number;
}
