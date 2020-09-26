import { ProfileService } from './../profile/profile.service';
import { UserLoginCredentials } from './input/user-login.input';
import { AuthService } from './auth.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthType } from './auth.type';
import { CreateUserCredentials } from './input/user-create.input';
import { forwardRef, Inject } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  @Query(() => AuthType)
  getUsers() {}

  @Mutation(() => AuthType)
  async createUser(
    @Args('createUserCredentions') createUserCredentials: CreateUserCredentials,
  ): Promise<{ accessToken: string }> {
    const { accessToken, id } = await this.authService.createUser(
      createUserCredentials,
    );
    await this.profileService.createProfile(id);
    return { accessToken };
  }

  @Mutation(() => AuthType)
  async userLogin(
    @Args('userLoginCredentials') userLoginCredentials: UserLoginCredentials,
  ): Promise<{ accessToken: string }> {
    return await this.authService.userLogin(userLoginCredentials);
  }
}
