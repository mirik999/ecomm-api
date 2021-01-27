import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthRes')
export class AuthRes {
  @Field()
  accessToken: string;
}
