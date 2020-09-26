import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileType } from './profile.type';

@Resolver()
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Mutation(() => ProfileType)
  async getProfile(@Args('id') id: string): Promise<Profile> {
    return this.profileService.getProfile(id);
  }
}
