import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import { ImageReq, SeoReq } from '../../../common/request/common.req';

@InputType()
export class CreateBiographyReq extends SeoReq {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  content: string;

  @IsArray()
  @Field(() => [ImageReq])
  images: ImageReq[];
}
