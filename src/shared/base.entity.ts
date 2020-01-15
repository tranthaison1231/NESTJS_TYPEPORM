import { PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export class BaseVm {
  constructor(
    public id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
