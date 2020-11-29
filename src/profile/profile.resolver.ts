import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileType } from './profile.type';
import { UpdateProfileCredentials } from './input/update-profile.input';
import { User } from '../utils/user.decorator';
import { JwtPayload } from '../utils/jwt.strategy';

@Resolver()
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => ProfileType)
  async getProfile(@User() user: JwtPayload): Promise<Profile> {
    return this.profileService.getProfile(user.email);
  }

  @Query(() => [ProfileType])
  getProfiles(
    @User() user: JwtPayload,
    @Args('type') type: string,
  ): Promise<Profile[]> {
    return this.profileService.getProfiles(type);
  }

  @Query(() => ProfileType)
  disableProfile(@User() user: JwtPayload): Promise<Profile> {
    return this.profileService.disableProfile(user);
  }

  @Mutation(() => ProfileType)
  updateProfile(
    @Args('updateProfileCredentials')
    updateProfileCredentials: UpdateProfileCredentials,
    @User() user: JwtPayload,
  ): Promise<Profile> {
    return this.profileService.updateProfile(user, updateProfileCredentials);
  }
}
