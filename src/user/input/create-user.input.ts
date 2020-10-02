import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserCredentials {
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(3)
  @Field()
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @Field()
  fullName: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  socialId: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  social: boolean;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  picture: string;

  @IsOptional()
  @IsString()
  @Field()
  account: string;
}
