import { forwardRef, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema }
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'top-secret-2020',
      signOptions: {
        expiresIn: 7200,
      },
    }),
    UserModule
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService, PassportModule]
})
export class AuthModule {}
