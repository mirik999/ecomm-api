import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JWT_SECRET_KEY } from '../../config/personal.data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '15m',
      },
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
