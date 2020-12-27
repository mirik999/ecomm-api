import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { CreateUserDto } from './dto/create.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Mutation(() => UserType)
  createUser(@Args("newUser") newUser: CreateUserDto): Promise<{ accessToken: string }> {
    return this.userService.createUser(newUser);
  }

  @Mutation(() => UserType)
  loginUser(@Args("newUser") newUser: CreateUserDto): Promise<{ accessToken: string }> {
    return this.userService.loginUser(newUser);
  }
}
