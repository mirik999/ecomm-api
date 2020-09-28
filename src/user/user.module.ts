import { ProfileModule } from './../profile/profile.module';
import { Auth } from './user.entity';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthResolver } from './auth.resolver';

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
    TypeOrmModule.forFeature([Auth]),
    forwardRef(() => ProfileModule),
  ],
  providers: [UserService, AuthResolver],
  exports: [PassportModule, UserService],
})
export class AuthModule {}
