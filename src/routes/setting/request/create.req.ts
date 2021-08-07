import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { v4 as uuid } from 'uuid';

@InputType()
export class CreateSettingReq {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true, defaultValue: uuid() })
  id: string;

  @IsString()
  @MaxLength(50)
  @Field()
  name: string;

  @IsString()
  @MaxLength(500)
  @Field()
  description: string;

  @IsString()
  @MaxLength(250)
  @Field()
  keywords: string;

  @IsString()
  @MaxLength(50)
  @Field()
  title: string;
}
