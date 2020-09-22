import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserCredentials {
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @Field()
  userName: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @Field()
  password: string;
}
