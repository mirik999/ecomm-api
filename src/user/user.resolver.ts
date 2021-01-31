import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthRes } from './response/auth.res';
import { AuthReq } from './request/auth.req';
import { User } from '../utils/user.decorator';
import { JwtPayload } from '../utils/jwt.strategy';
import { UserRes, UsersRes } from './response/user.res';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { UpdateUserReq } from './request/update-roles.req';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';

@Resolver(() => AuthRes)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UsersRes)
  getUsers(
    @User() user: JwtPayload,
    @Args('controls') controls: GetElementsInput,
  ) {
    return this.userService.getUsers(controls);
  }

  @Mutation(() => UserRes)
  updateUser(
    @User() user: JwtPayload,
    @Args('updatedUser') updatedUser: UpdateUserReq,
  ) {
    return this.userService.updateUser(updatedUser);
  }

  @Mutation(() => AuthRes)
  createUser(@Args('newUser') newUser: AuthReq): Promise<AuthRes> {
    return this.userService.createUser(newUser);
  }

  @Mutation(() => AuthRes)
  loginUser(@Args('user') user: AuthReq): Promise<AuthRes> {
    return this.userService.loginUser(user);
  }

  @Mutation(() => GetByIdsOutput)
  disableUsers(
    @User() user: JwtPayload,
    @Args('disabledUsers') disabledUsers: GetByIdsInput,
  ) {
    return this.userService.disableUsers(disabledUsers);
  }

  @Mutation(() => GetByIdsOutput)
  activateUsers(
    @User() user: JwtPayload,
    @Args('activateUsers') activateUsers: GetByIdsInput,
  ) {
    return this.userService.activateUsers(activateUsers);
  }
}
