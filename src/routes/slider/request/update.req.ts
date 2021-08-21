import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { DefaultReq, ImageReq } from '../../../common/request/common.req';

@InputType()
export class UpdateSliderReq extends DefaultReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field({ nullable: true })
  name: string;

  @IsArray()
  @Field(() => [ImageReq], { nullable: true })
  images: ImageReq[];

  @IsBoolean()
  @Field({ nullable: true })
  fade: boolean;

  @IsBoolean()
  @Field({ nullable: true })
  vertical: boolean;
}
