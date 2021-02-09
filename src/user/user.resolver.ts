import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthRes } from '../auth/response/auth.res';
import { User } from '../utils/user.decorator';
import { UserRes, UsersRes } from './response/user.res';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { UpdateUserReq } from './request/user.req';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';

@Resolver(() => AuthRes)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UsersRes)
  getUsers(
    @User() user: Partial<UserRes>,
    @Args('controls') controls: GetElementsInput,
  ) {
    return this.userService.getUsers(controls);
  }

  @Mutation(() => UserRes)
  updateUser(
    @User() user: Partial<UserRes>,
    @Args('updatedUser') updatedUser: UpdateUserReq,
  ) {
    return this.userService.updateUser(updatedUser);
  }

  @Mutation(() => GetByIdsOutput)
  disableUsers(
    @User() user: Partial<UserRes>,
    @Args('disabledUsers') disabledUsers: GetByIdsInput,
  ) {
    return this.userService.disableUsers(disabledUsers);
  }

  @Mutation(() => GetByIdsOutput)
  activateUsers(
    @User() user: Partial<UserRes>,
    @Args('activateUsers') activateUsers: GetByIdsInput,
  ) {
    return this.userService.activateUsers(activateUsers);
  }

  @Mutation(() => GetByIdsOutput)
  deleteUsers(
    @User() user: Partial<UserRes>,
    @Args('deleteUsers') deleteUsers: GetByIdsInput,
  ) {
    return this.userService.deleteUsers(deleteUsers);
  }
}
