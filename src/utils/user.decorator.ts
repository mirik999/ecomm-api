import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/personal.data';

export type UserDataType = {
  id: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
};

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();
    const token = context.req.headers?.authorization?.slice(7);
    const gqlMethod = context.req.body.operationName;

    try {
      return await verifyToken(token, gqlMethod);
    } catch (errObj) {
      if (errObj.status === 401) {
        throw new UnauthorizedException(errObj.msg);
      }
      if (errObj.status === 403) {
        throw new ForbiddenException(errObj.msg);
      }
    }
  },
);

async function verifyToken(token: string, method: string): Promise<any> {
  return new Promise((res, rej) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, data: UserDataType) => {
      if (err) {
        rej({
          status: 401,
          msg: 'Unauthorized',
        });
      }
      const isGuest = getUserRole(data.roles, 'guest');
      const isAdmin = getUserRole(data.roles, 'admin');
      const isSudo = getUserRole(data.roles, 'sudo');

      if (isSudo) {
        delete data.iat;
        delete data.exp;
        res(data);
      } else if (
        (isAdmin && method.includes('Delete')) ||
        method.includes('Update')
      ) {
        rej({
          status: 403,
          msg: 'Forbidden, only Sudo has access',
        });
      } else if (isGuest && !method.includes('Get')) {
        rej({
          status: 403,
          msg: 'Forbidden, Guest has not access',
        });
      }
    });
  });
}

export function getUserRole(
  roles: string[],
  expect: 'guest' | 'admin' | 'sudo',
) {
  const isGuest = !roles.includes('admin') && !roles.includes('sudo');
  const isAdmin = roles.includes('admin') && !roles.includes('sudo');
  const isSudo = roles.includes('sudo');

  if (isGuest) {
    return expect === 'guest';
  } else if (isAdmin) {
    return expect === 'admin';
  } else if (isSudo) {
    return expect === 'sudo';
  }
  return false;
}
