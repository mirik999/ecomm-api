import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class UpdateSliderReq {
  @IsUUID()
  @Field({ nullable: true })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field({ nullable: true })
  name: string;

  @IsArray()
  @Field(() => [String], { nullable: true })
  images: string[];

  @IsBoolean()
  @Field({ nullable: true })
  fade: boolean;

  @IsBoolean()
  @Field({ nullable: true })
  vertical: boolean;
}
