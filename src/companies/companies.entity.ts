import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '@/shared/base.entity';

@Entity()
export class Company extends BaseModel {
  @Column()
  email: string;

  @Column({ nullable: true })
  name: string;
}
