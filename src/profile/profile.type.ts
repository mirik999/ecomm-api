import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Profile')
export class ProfileType {
  @Field(type => ID)
  id: string;

  @Field()
  birthDate: string;

  @Field()
  city: string;

  @Field()
  phone: number;

  @Field()
  gender: string;

  @Field()
  picture: string;

  @Field()
  skills: string;

  @Field()
  experriance: string;

  @Field()
  additionalInfo: string;
}
