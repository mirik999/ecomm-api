import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Profile')
export class ProfileType {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  fullName: string;

  @Field()
  social: boolean;

  @Field()
  socialId: string;

  @Field()
  picture: string;

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
  profession: string;

  @Field()
  salary: string;

  @Field()
  skills: string;

  @Field()
  experience: string;

  @Field()
  jobDescription: string;

  @Field()
  education: string;

  @Field()
  additionalInfo: string;

  @Field()
  user: string;

  @Field()
  account: string;
}
