import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
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
  ],
  providers: [UserService, UserResolver],
  exports: [PassportModule, UserService],
})
export class UserModule {}
