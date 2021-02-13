import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { AuthDocument } from './auth.schema';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AuthReq } from './request/auth.req';
import { AuthRes } from './response/auth.res';
import * as jwt from 'jsonwebtoken';
import { UserDataType } from '../utils/user.decorator';

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
    await this.upsertTokenStatus(credentials);
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
    await this.upsertTokenStatus(credentials);
    return credentials;
  }

  async logoutUser(credentials: AuthReq): Promise<Partial<AuthRes>> {
    await this.deleteTokenStatus(credentials);
    return {
      clientId: null
    }
  }

  async refreshToken(credentials: Partial<AuthRes>) {
    const newAccessToken = await this.refreshJwt(credentials.accessToken);
    await this.upsertTokenStatus(credentials)
    return {
      accessToken: newAccessToken,
      refreshToken: uuid(),
      clientId: credentials.clientId,
      createdAt: new Date().toString()
    }
  }

  private generateToken(user: Partial<User>): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  private async deleteTokenStatus(credentials: AuthReq): Promise<boolean> {
    try {
      const result = this.authRepository.deleteOne({ clientId: credentials.clientId });
      console.log(result)
      return true;
    } catch (err) {
      throw new NotFoundException('Client id not found => ', err.message)
    }
  }

  private async upsertTokenStatus(credentials) {
    try {
      return await this.authRepository.findOneAndUpdate(
        { clientId: credentials.clientId },
        { ...credentials },
        { new: true, upsert: true }
      )
    } catch(err) {
      throw new ConflictException('Cant upsert new credentials => ', err.message)
    }
  }

  private async refreshJwt(accessToken: string): Promise<string> {
    return new Promise((res) => {
      jwt.verify(accessToken, 'top-secret-2020',(err) => {
        if (err) {
          const decodedToken = jwt.decode(accessToken) as UserDataType;
          const user = {
            id: decodedToken.id,
            email: decodedToken.email,
            roles: decodedToken.roles
          }
          res(this.generateToken(user));
        } else {
          res(accessToken);
        }
      })
    })
  }
}
