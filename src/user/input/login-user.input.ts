import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class UserLoginCredentials {
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(3)
  @Field()
  password: string;
}
