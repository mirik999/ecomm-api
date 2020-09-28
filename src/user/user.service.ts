import { UserLoginCredentials } from './input/user-login.input';
import { JwtPayload } from './utils/jwt.strategy';
import { CreateUserCredentials } from './input/user-create.input';
import { Auth } from './user.entity';
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
  ): Promise<{ id: string; accessToken: string }> {
    const { fullName, email, password } = createUserCredentials;
    const user = new Auth();
    user.fullName = fullName;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      const accessToken = (await this.generateToken(user.email)).accessToken;
      return {
        id: user.id,
        accessToken: accessToken,
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
