import { Profile } from './profile/profile.entity';
import { User } from './user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/employeer',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Profile],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
    ProfileModule,
  ],
})
export class AppModule {}
