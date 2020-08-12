import { Column, Entity, JoinColumn, PrimaryColumn, OneToOne } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseModel } from '../../shared/base.entity';

@Entity()
export class RefreshToken extends BaseModel {
  @Column()
  userId: string;

  @Column({ unique: true })
  token: string;
}
