import { UserLoginCredentials } from './input/login-user.input';
import { JwtPayload } from '../utils/jwt.strategy';
import { CreateUserCredentials } from './input/create-user.input';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getAll() {
    return this.userRepository.find();
  }

  async createUser(
    createUserCredentials: CreateUserCredentials,
  ): Promise<{
    id: string;
    email: string;
    fullName: string;
    accessToken: string;
    social: boolean;
    socialId: string;
    picture: string;
    account: string;
  }> {
    const {
      email,
      password,
      fullName,
      social,
      socialId,
      picture,
      account
    } = createUserCredentials;

    const user = new User();
    user.id = uuid();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      const tokenCredentials = {
        id: user.id,
        email: user.email,
      };
      const accessToken = (await this.generateToken(tokenCredentials))
        .accessToken;
      return {
        id: user.id,
        email: user.email,
        accessToken,
        fullName,
        social,
        socialId,
        picture,
        account
      };
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async userLogin(
    userLoginCredentials: UserLoginCredentials,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUserPassword(userLoginCredentials);
    console.log('user valid', user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private async validateUserPassword(
    userLoginCredentials: UserLoginCredentials,
  ): Promise<JwtPayload> {
    const { email, password } = userLoginCredentials;
    const user = await this.userRepository.findOne({ where : { email }  });
    console.log('user cred', userLoginCredentials);
    console.log('user self', user)

    if (user && (await (await user).validatePassword(password))) {
      console.log('aue')
      return {
        id: user.id,
        email: user.email,
      };
    } else {
      console.log('aue null')
      return null;
    }
  }

  private async generateToken(
    user: JwtPayload,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign(user);

    return { accessToken };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
