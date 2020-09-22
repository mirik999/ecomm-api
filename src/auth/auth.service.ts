import { UserLoginCredentials } from './input/user-login-credentials.input';
import { JwtPayload } from './utils/jwt.strategy';
import { CreateUserCredentials } from './input/create-user-credentials.input';
import { Auth } from './auth.entity';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createUserCredentials: CreateUserCredentials,
  ): Promise<{ accessToken: string }> {
    const { fullName, email, password } = createUserCredentials;
    const user = new Auth();
    user.fullName = fullName;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return this.generateToken(user.email);
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
    const email = await this.validateUserPassword(userLoginCredentials);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(email);
  }

  private async validateUserPassword(
    userLoginCredentials: UserLoginCredentials,
  ): Promise<string> {
    const { email, password } = userLoginCredentials;
    const user = await this.userRepository.findOne({ email });

    if (user && (await (await user).validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async generateToken(email: string): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
