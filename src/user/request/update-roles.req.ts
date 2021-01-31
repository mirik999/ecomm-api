import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsString, IsUUID } from 'class-validator';

@InputType('UpdateUserReq')
export class UpdateUserReq {
  @IsString()
  @IsUUID()
  @Field()
  id: string;

  @IsBoolean()
  @Field()
  isDisabled: boolean;

  @IsArray()
  @Field(() => [String])
  roles: string[];
}
