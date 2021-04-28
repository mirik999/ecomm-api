import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsEmail, IsString, IsUUID, IsDate } from 'class-validator';

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

  @IsDate()
  @Field()
  createdAt: Date;

  @IsArray()
  @Field(() => [String])
  roles: string[];
}
