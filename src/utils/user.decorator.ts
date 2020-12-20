import { ConflictException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt_decode from 'jwt-decode';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();
    try {
      const payload = jwt_decode(context.req.headers.authorization);
      delete payload.iat;
      delete payload.exp;
      return payload;
    } catch(err) {
      throw new ConflictException('Invalid token specified')
    }
  }
);
