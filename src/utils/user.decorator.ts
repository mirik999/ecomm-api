import { ConflictException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();
    const token = context.req.headers.authorization.slice(7);

    jwt.verify(
      token,
      'top-secret-2020',
      (err, data) => {
        if (err) {
          throw new ConflictException('Invalid token specified');
        } else {
          delete data.iat;
          delete data.exp;
          return data;
        }
      }
    )
  }
);
