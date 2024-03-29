import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const RefreshToken = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();
    const accessToken = context.req.headers?.authorization?.slice(7);
    const refreshToken = context.req.headers?.refreshtoken?.slice(8);
    const clientId = context.req.headers?.clientid?.slice(7);

    return { accessToken, refreshToken, clientId };
  },
);
