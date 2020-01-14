import { v4 } from 'uuid';
import { redis } from '../redis';
import { confirmationPrefix } from '../constants/redisPrefixes';
import { HOST } from '../environments';

export const confirmEmailLink = async (userId: number) => {
  const token = v4();
  await redis.set(confirmationPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 day expiration
  return `${HOST}/auth/change-password/${token}`;
};
