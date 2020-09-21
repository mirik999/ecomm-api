import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';

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
    TypeOrmModule.forFeature([]),
  ],
  providers: [AuthService],
  exports: [PassportModule],
})
export class AuthModule {}
