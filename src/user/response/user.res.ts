import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserRes')
export class UserRes {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field(() => [String], { nullable: true })
  roles: string[];
  @Field({ nullable: true })
  isDisabled: boolean;
  @Field({ nullable: true })
  createdAt: string;
}

@ObjectType('UsersRes')
export class UsersRes {
  @Field(() => [UserRes])
  payload: UserRes[];
  @Field()
  count: number;
}
