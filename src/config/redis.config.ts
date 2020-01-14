import { Transport } from '@nestjs/common/enums/transport.enum';

export const microserviceOptions = {
  transport: Transport.REDIS,
  options: {
    url: 'redis-15028.c15.us-east-1-4.ec2.cloud.redislabs.com:15028',
  },
};
