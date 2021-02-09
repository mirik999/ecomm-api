import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { AuthDocument } from './auth.schema';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthReq } from './request/auth.req';
import { AuthRes } from './response/auth.res';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth')
    private authRepository: Model<AuthDocument>,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async createUser(user: AuthReq): Promise<AuthRes> {
    const payload: User = await this.userService.createUser(user);
    const credentials = {
      accessToken: this.generateToken(payload),
      refreshToken: uuid(),
      clientId: uuid(),
      createdAt: new Date().toString()
    }
    await this.updateTokenStatus(credentials);
    return credentials;
  }

  async loginUser(user: AuthReq): Promise<AuthRes> {
    const payload = await this.userService.loginUser(user);
    const credentials = {
      accessToken: this.generateToken(payload),
      refreshToken: uuid(),
      clientId: uuid(),
      createdAt: new Date().toString()
    }
    await this.updateTokenStatus(credentials);
    return credentials;
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  private async updateTokenStatus(credentials) {
    try {
      const token = await this.authRepository.findOne({ clientId: credentials.clientId })
      if (token) {
        await this.authRepository.deleteOne({ clientId: credentials.clientId })
      } else {
        await this.authRepository.create(credentials)
      }
    } catch(err) {
      console.log(err)
    }
  }
}
