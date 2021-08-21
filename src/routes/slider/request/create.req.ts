import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { DefaultReq, ImageReq } from '../../../common/request/common.req';

@InputType()
export class CreateSliderReq extends DefaultReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @ArrayNotEmpty()
  @IsArray()
  @Field(() => [ImageReq])
  images: ImageReq[];

  @IsBoolean()
  @Field()
  fade: boolean;

  @IsBoolean()
  @Field()
  vertical: boolean;
}
