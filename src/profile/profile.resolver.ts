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
  getProfile(@User() user: JwtPayload): Promise<Profile> {
    console.log('profile.resolver', user.email)
    return this.profileService.getProfile(user.email);
  }

  @Query(() => ProfileType)
  disableProfile(@User() user: JwtPayload): Promise<Profile> {
    return this.profileService.disableProfile(user)
  }

  @Mutation(() => ProfileType)
  updateProfile(
    @Args('updateProfileCredentials') updateProfileCredentials: UpdateProfileCredentials,
    @User() user: JwtPayload
  ): Promise<Profile> {
    return this.profileService.updateProfile(user, updateProfileCredentials)
  }
}
