import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @Field()
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @Field()
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  socialId: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  social: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  picture: string;
}
