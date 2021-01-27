import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthRes } from './response/auth.res';
import { AuthReq } from './request/auth.req';

@Resolver(() => AuthRes)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => AuthRes)
  createUser(@Args('newUser') newUser: AuthReq): Promise<AuthRes> {
    return this.userService.createUser(newUser);
  }

  @Mutation(() => AuthRes)
  loginUser(@Args('user') user: AuthReq): Promise<AuthRes> {
    return this.userService.loginUser(user);
  }
}
