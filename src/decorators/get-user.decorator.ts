import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Card } from '../modules/cards/cards.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Card => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
