import { ProfileModule } from '../profile/profile.module';
import { User } from './user.entity';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtStrategy } from '../utils/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'top-secret-2020',
      signOptions: {
        expiresIn: 7200,
      },
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule),
  ],
  providers: [UserService, UserResolver],
  exports: [PassportModule, UserService],
})
export class UserModule {}
