import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field(type => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  accessToken: string;
}
