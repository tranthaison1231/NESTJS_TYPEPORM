import * as Redis from 'ioredis';
import {
  REDIS_PORT,
  REDIS_FAMILY,
  REDIS_PASSWORD,
  REDIS_DB,
  REDIS_HOST,
} from '@/environments';

export const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  family: REDIS_FAMILY, // 4 (IPv4) or 6 (IPv6)
  password: REDIS_PASSWORD,
  db: REDIS_DB,
});
