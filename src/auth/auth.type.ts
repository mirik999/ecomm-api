import { ProfileType } from './../profile/profile.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class AuthType {
  @Field(type => ID)
  id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  accessToken: string;

  @Field(type => [ProfileType])
  profile: string;
}
