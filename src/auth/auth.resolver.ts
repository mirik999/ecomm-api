import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthType } from './auth.type';
import { CreateUserCredentials } from './input/create-user-credentials.input';

@Resolver()
export class AuthResolver {
  @Query(returns => AuthType)
  getUsers() {}

  @Mutation(returns => AuthType)
  createUser(
    @Args('createUserCredentions') createUserCredentials: CreateUserCredentials,
  ) {
    console.log(createUserCredentials);
  }
}
