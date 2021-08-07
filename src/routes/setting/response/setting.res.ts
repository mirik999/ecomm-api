import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SettingRes')
export class SettingRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  keywords: string;

  @Field({ nullable: true })
  title: string;
}

