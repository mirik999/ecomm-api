import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Auth')
export class AuthType {
  @Field(type => ID)
  id: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
