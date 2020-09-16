import { Column, Entity } from 'typeorm';

import { BaseModel } from '../../shared/base.entity';

@Entity()
export class RefreshToken extends BaseModel {
  @Column()
  userId: string;

  @Column({ unique: true })
  token: string;
}
