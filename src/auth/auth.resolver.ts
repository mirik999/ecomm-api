import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthRes } from './response/auth.res';
import { AuthReq } from './request/auth.req';
import { AuthService } from './auth.service';

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
}
