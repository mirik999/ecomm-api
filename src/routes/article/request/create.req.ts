import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ImageReq, SeoReq } from '../../../common/request/common.req';

@InputType('CreateArticleReq')
export class CreateArticleReq extends SeoReq {
  @IsNotEmpty()
  @Field()
  cover: ImageReq;

  @IsOptional()
  @IsArray()
  @Field(() => [ImageReq], { defaultValue: [] })
  images: ImageReq[];

  @IsString()
  @IsNotEmpty()
  @Field({ defaultValue: 'Dr. Rəxşəndə Aslanova' })
  author: string;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  content: string;
}
