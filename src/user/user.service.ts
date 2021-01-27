import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { AuthReq } from './request/auth.req';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userRepository: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(newUser: AuthReq): Promise<{ accessToken: string }> {
    const isUserExists = await this.checkUser(newUser.email);
    if (isUserExists) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.id = uuid();
    user.email = newUser.email;
    user.salt = await bcrypt.genSalt();
    user.roles = ['guest'];
    user.password = await UserService.hashPassword(newUser.password, user.salt);

    try {
      await this.userRepository.create(user);
      return this.generateToken(user);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async loginUser(newUser: AuthReq): Promise<{ accessToken: string }> {
    const user = await this.checkUser(newUser.email);
    await UserService.isUserPasswordValid(user, newUser.password);
    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ accessToken: string }> {
    const tokenCredentials = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = this.jwtService.sign(tokenCredentials);
    return { accessToken };
  }

  private async checkUser(email: string): Promise<UserDocument> {
    return this.userRepository.findOne({ email });
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  static async isUserPasswordValid(
    user: User,
    password: string,
  ): Promise<boolean> {
    if (user) {
      const isValid = await UserService.validatePassword(user, password);
      if (isValid) {
        return true;
      } else {
        throw new ConflictException('Wrong password');
      }
    } else {
      throw new ConflictException('Email does not exists');
    }
  }

  static async validatePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }
}
