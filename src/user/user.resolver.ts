import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { AuthInput } from './input/auth.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserType)
  createUser(
    @Args('newUser') newUser: AuthInput,
  ): Promise<{ accessToken: string }> {
    return this.userService.createUser(newUser);
  }

  @Mutation(() => UserType)
  loginUser(@Args('user') user: AuthInput): Promise<{ accessToken: string }> {
    return this.userService.loginUser(user);
  }
}
