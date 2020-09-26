import { Profile } from './profile/profile.entity';
import { Auth } from './auth/auth.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/employeer',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Auth, Profile],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
