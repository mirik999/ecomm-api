import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SettingService } from './setting.service';
import { SettingRes } from './response/setting.res';
import { CreateSettingReq } from './request/create.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { UpdateSettingReq } from './request/update.req';

@Resolver(() => SettingRes)
export class SettingResolver {
  constructor(
    private settingService: SettingService
  ) {}

  @Query(() => SettingRes)
  async getSettingByName(@Args('name') name: string) {
    return this.settingService.getSettingByName(name);
  }

  @Mutation(() => SettingRes)
  createSetting(
    @User() user: Partial<UserRes>,
    @Args('newSetting') newSetting: CreateSettingReq
  ) {
    return this.settingService.createSetting(newSetting)
  }

  @Mutation(() => SettingRes)
  updateSetting(
    @User() user: Partial<UserRes>,
    @Args('updatedSetting')
      updatedSetting: UpdateSettingReq,
  ) {
    return this.settingService.updateSetting(updatedSetting);
  }
}
