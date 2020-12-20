import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create.dto';
import { JwtPayload } from '../utils/jwt.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userRepository: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async createUser(newUser: CreateUserDto) {
    const user = new User();
    user.id = uuid();
    user.email = newUser.email;
    user.salt = await bcrypt.genSalt();
    user.password = await UserService.hashPassword(newUser.password, user.salt);

    try {
      await this.userRepository.create(user);
      const tokenCredentials = {
        id: user.id,
        email: user.email
      }
      const { accessToken } = await this.generateToken(tokenCredentials);
      return {
        id: user.id,
        email: user.email,
        accessToken
      }
    } catch(err) {
      if (err.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async generateToken(
    user: JwtPayload,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign(user);

    return { accessToken };
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
