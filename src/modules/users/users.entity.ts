import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../../shared/base.entity';
import { Transaction } from '../transactions/transactions.entity';
import { Gender, UserRole } from './user.interface';

const { UPDATE } = CrudValidationGroups;

@Entity()
export class User extends BaseModel {
  @Column({ default: 0 })
  amount: number;

  @IsOptional({ groups: [UPDATE] })
  @MaxLength(100, { always: true })
  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.FEMALE })
  gender: Gender;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  salt: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column({ default: 0, type: 'int', name: 'total_transaction' })
  totalTransaction: number;

  @OneToMany(() => Transaction, (transaciton) => transaciton.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
