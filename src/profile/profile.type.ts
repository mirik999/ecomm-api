import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Profile')
export class ProfileType {
  @Field(type => ID)
  id: string;

  @Field()
  isDisabled: boolean;

  @Field()
  createdAt: string;

  @Field()
  birthDate: string;

  @Field()
  city: string;

  @Field()
  phone: string;

  @Field()
  gender: string;

  @Field()
  picture: string;

  @Field()
  skills: string;

  @Field()
  experience: string;

  @Field()
  additionalInfo: string;

  @Field()
  user: string;
}
