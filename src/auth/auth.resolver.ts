import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
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
  createUser(@Args('newUser') newUser: AuthReq): Promise<AuthRes> {
    return this.authService.createUser(newUser);
  }

  @Mutation(() => AuthRes)
  loginUser(@Args('user') user: AuthReq): Promise<AuthRes> {
    return this.authService.loginUser(user);
  }

  @Mutation(() => AuthRes)
  logoutUser(@Args('user') user: AuthReq): Promise<Partial<AuthRes>> {
    return this.authService.logoutUser(user);
  }

  @Query(() => AuthRes)
  refreshToken(
    @RefreshToken() refreshToken: Partial<AuthRes>
  ): Promise<AuthRes> {
    return this.authService.refreshToken(refreshToken);
  }
}
