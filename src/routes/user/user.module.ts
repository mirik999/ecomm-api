import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserGateway } from './user.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [UserService, UserResolver, UserGateway],
  exports: [UserService],
})
export class UserModule {}
