import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User, UserDocument } from '../user/user.schema';

export interface JwtPayload {
  email: string;
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User')
    private userRepository: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'top-secret-2020',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
