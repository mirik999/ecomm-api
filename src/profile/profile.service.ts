import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getProfile(id: string): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne({ id });
      return profile;
    } catch (err) {
      throw new NotFoundException('Profile was not found');
    }
  }
}
