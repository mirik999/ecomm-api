import { ProfileService } from '../profile/profile.service';
import { UserLoginCredentials } from './input/login-user.input';
import { UserService } from './user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { CreateUserCredentials } from './input/create-user.input';
import { forwardRef, Inject } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(
    private authService: UserService,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  @Query(() => [UserType])
  getUsers() {
    return this.authService.getAll();
  }

  @Mutation(() => UserType)
  async createUser(
    @Args('createUserCredentions') createUserCredentials: CreateUserCredentials,
  ): Promise<{ accessToken: string }> {
    const { accessToken, id } = await this.authService.createUser(
      createUserCredentials,
    );
    await this.profileService.createProfile(id);
    return { accessToken };
  }

  @Mutation(() => UserType)
  async userLogin(
    @Args('userLoginCredentials') userLoginCredentials: UserLoginCredentials,
  ): Promise<{ accessToken: string }> {
    return await this.authService.userLogin(userLoginCredentials);
  }
}
