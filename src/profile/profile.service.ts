import { UserService } from '../user/user.service';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { v4 as uuid } from 'uuid';
import { UpdateProfileCredentials } from './input/update-profile.input';
import { JwtPayload } from '../utils/jwt.strategy';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => UserService))
    private authService: UserService,
  ) {}

  async getProfile(email: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { email } });
    if (profile) {
      if (profile.isDisabled) {
        throw new ConflictException('Profile is disabled');
      } else {
        return profile;
      }
    } else {
      throw new NotFoundException('Profile not found');
    }
  }

  async createProfile(
    id: string,
    email: string,
    fullName: string,
    social: boolean,
    socialId: string,
    picture: string,
    account: string,
  ): Promise<Profile> {
    try {
      const profile = new Profile();
      profile.id = uuid();
      profile.user = id;
      profile.email = email;
      profile.fullName = fullName;
      profile.createdAt = new Date().toString();
      profile.isDisabled = false;
      profile.account = account;
      profile.social = social || false;
      profile.socialId = socialId || '';
      profile.picture = picture || '';
      profile.birthDate = '';
      profile.city = '';
      profile.phone = '';
      profile.gender = '';
      profile.skills = '';
      profile.experience = '';
      profile.additionalInfo = '';
      return this.profileRepository.save(profile);
    } catch (err) {
      throw new ConflictException('Cant create a profile');
    }
  }

  async updateProfile(
    user: JwtPayload,
    updateProfileCredentials: UpdateProfileCredentials,
  ): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({ user: user.id });
      for (let key in updateProfileCredentials) {
        profile[key] = updateProfileCredentials[key];
      }
      return this.profileRepository.save(profile);
    } catch (err) {
      throw new ConflictException('Cant update a profile');
    }
  }

  async disableProfile(user: JwtPayload): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({ user: user.id });
      profile.isDisabled = true;
      return this.profileRepository.save(profile);
    } catch (err) {
      throw new ConflictException('Cant disable a profile');
    }
  }
}