import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../shared/base.entity';

@Entity()
export class Card extends BaseModel {
  @Column()
  amount: number;

  @Column({ default: null })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;
}
