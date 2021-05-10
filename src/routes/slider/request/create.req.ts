import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateSliderReq {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @ArrayNotEmpty()
  @IsArray()
  @Field(() => [String])
  images: string[];

  @IsBoolean()
  @Field()
  fade: boolean;

  @IsBoolean()
  @Field()
  vertical: boolean;
}
