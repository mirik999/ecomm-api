import { Field, ID, ObjectType } from '@nestjs/graphql';

export interface PictureType {
  data: {
    height: number;
    is_silhuete: boolean;
    url: string;
  };
}

@ObjectType('Auth')
export class AuthType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  picture: PictureType;

  @Field()
  phone: string;

  @Field()
  birthDate: string;

  @Field()
  city: string;

  @Field()
  skills: string;

  @Field()
  experience: string;

  @Field()
  education: string;

  @Field()
  additionalInfo: string;
}
