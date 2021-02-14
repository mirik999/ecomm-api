import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthRes } from './response/auth.res';
import { AuthReq } from './request/auth.req';
import { AuthService } from './auth.service';
import { RefreshToken } from '../utils/refresh-token.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Mutation(() => AuthRes)
  createUser(@Args('newUser') newUser: AuthReq) {
    return this.authService.createUser(newUser);
  }

  @Mutation(() => AuthRes)
  loginUser(@Args('user') user: AuthReq) {
    return this.authService.loginUser(user);
  }

  @Query(() => AuthRes)
  logoutUser(@Args('clientId') clientId: string) {
    return this.authService.logoutUser(clientId);
  }

  @Query(() => AuthRes)
  refreshToken(@RefreshToken() refreshToken: Partial<AuthRes>) {
    return this.authService.refreshToken(refreshToken);
  }
}
