import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ImageReq, SeoReq } from '../../../common/request/common.req';

@InputType()
export class CreateGalleryReq extends SeoReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @ArrayNotEmpty()
  @IsArray()
  @Field(() => [ImageReq])
  images: ImageReq[];
}
