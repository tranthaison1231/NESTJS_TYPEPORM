import { v4 } from 'uuid';
import { redis } from '@/redis';
import { confirmationPrefix } from '@/constants/redisPrefixes';
import { WEB_URL } from '@/environments';

export const generateConfirmEmailLink = async (userId: string) => {
  const token = v4();
  const expiredToken = 60 * 60 * 24;
  await redis.set(confirmationPrefix + token, userId, 'ex', expiredToken); // 1 day expiration
  return `${WEB_URL}/change-password?token=${token}`;
};
