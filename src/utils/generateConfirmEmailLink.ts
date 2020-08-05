import { v4 } from 'uuid';
import { redis } from '@/redis';
import { forgotPasswordPrefix } from '@/constants/redisPrefixes';
import { WEB_URL } from '@/environments';

export const generateConfirmEmailLink = async (userId: string) => {
  const verifyCode = v4();
  const expired = 60 * 60 * 24;
  await redis.set(forgotPasswordPrefix + verifyCode, userId, 'ex', expired); // 1 day expiration
  return `${WEB_URL}/change-password?verify-code=${verifyCode}`;
};
