import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';

@InputType('UpdateUserReq')
export class UpdateUserReq {
  @IsString()
  @IsUUID()
  @Field()
  id: string;

  @IsEmail()
  @Field()
  email: string;

  @IsBoolean()
  @Field()
  isDisabled: boolean;

  @IsString()
  @Field()
  createdAt: string;

  @IsArray()
  @Field(() => [String])
  roles: string[];
}
