import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class AuthInput {
  @IsEmail()
  @IsString()
  @Field()
  email: string;

  @MinLength(6)
  @IsString()
  @Field()
  password: string;
}