import { UserLoginCredentials } from './input/user-login-credentials.input';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthType } from './auth.type';
import { CreateUserCredentials } from './input/create-user-credentials.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AuthType)
  getUsers() {}

  @Mutation(() => AuthType)
  async createUser(
    @Args('createUserCredentions') createUserCredentials: CreateUserCredentials,
  ): Promise<{ accessToken: string }> {
    return await this.authService.createUser(createUserCredentials);
  }

  @Mutation(() => AuthType)
  async userLogin(
    @Args('userLoginCredentials') userLoginCredentials: UserLoginCredentials,
  ): Promise<{ accessToken: string }> {
    return await this.authService.userLogin(userLoginCredentials);
  }
}
