import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthRes } from '../auth/response/auth.res';
import { User } from '../../utils/user.decorator';
import { UserRes, UsersRes } from './response/user.res';
import { GetReq } from '../../common/request/get.req';
import { UpdateUserReq } from './request/user.req';
import {
  GetByIdsReq
} from '../../common/request/get-by-ids.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => AuthRes)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserRes)
  async getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Query(() => UsersRes)
  getUsers(
    @User() user: Partial<UserRes>,
    @Args('controls') controls: GetReq,
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

  @Mutation(() => GetByIdsRes)
  disableUsers(
    @User() user: Partial<UserRes>,
    @Args('disabledUsers') disabledUsers: GetByIdsReq,
  ) {
    return this.userService.disableUsers(disabledUsers);
  }

  @Mutation(() => GetByIdsRes)
  activateUsers(
    @User() user: Partial<UserRes>,
    @Args('activateUsers') activateUsers: GetByIdsReq,
  ) {
    return this.userService.activateUsers(activateUsers);
  }

  @Mutation(() => GetByIdsRes)
  deleteUsers(
    @User() user: Partial<UserRes>,
    @Args('deleteUsers') deleteUsers: GetByIdsReq,
  ) {
    return this.userService.deleteUsers(deleteUsers);
  }
}
