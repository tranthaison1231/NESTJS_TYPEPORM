import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseModel } from '@/shared/base.entity';
import { User } from '@/users/user.entity';

@Entity()
export class Company extends BaseModel {
  @Column()
  email: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(
    type => User,
    user => user.company,
    { eager: true },
  )
  user: User[];
}
