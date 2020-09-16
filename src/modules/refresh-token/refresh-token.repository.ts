import { Repository, EntityRepository } from 'typeorm';

import * as crypto from 'crypto';
import { RefreshToken } from './refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  async createOne(userId: string): Promise<string> {
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const tokenObject = new RefreshToken();
    tokenObject.token = token;
    tokenObject.userId = userId;
    tokenObject.save();
    return tokenObject.token;
  }
}
