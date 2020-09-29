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

  async getProfile(user: JwtPayload): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ user: user.id });
    } catch (err) {
      throw new NotFoundException('Profile was not found');
    }
  }

  async createProfile(id: string): Promise<Profile> {
    try {
      const profile = new Profile();
      profile.id = uuid();
      profile.user = id;
      profile.createdAt = new Date().toString();
      profile.isDisabled = false;
      profile.birthDate = null;
      profile.city = null;
      profile.phone = null;
      profile.gender = null;
      profile.picture = null;
      profile.skills = null;
      profile.experience = null;
      profile.additionalInfo = null;
      return this.profileRepository.save(profile);
    } catch(err) {
      throw new ConflictException('Cant create a profile')
    }
  }

  async updateProfile(
    user: JwtPayload,
    updateProfileCredentials: UpdateProfileCredentials
  ): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({ user: user.id });
      for (let key in updateProfileCredentials) {
        profile[key] = updateProfileCredentials[key];
      }
      return this.profileRepository.save(profile)
    } catch(err) {
      throw new ConflictException('Cant update a profile')
    }
  }

  async disableProfile(
    user: JwtPayload
  ): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({ user: user.id })
      profile.isDisabled = true;
      return this.profileRepository.save(profile)
    } catch(err) {
      throw new ConflictException('Cant disable a profile');
    }
  }
}
