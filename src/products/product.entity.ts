import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ProductStatus } from './product.model';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  price: string;

  @Column()
  status: ProductStatus;
}
