import { AuthService } from './../auth/auth.service';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async getProfile(id: string): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({ id });
      return profile;
    } catch (err) {
      throw new NotFoundException('Profile was not found');
    }
  }

  async createProfile(id: string): Promise<void> {
    const profile = this.profileRepository.create({ id });
    this.profileRepository.save(profile);
  }
}
