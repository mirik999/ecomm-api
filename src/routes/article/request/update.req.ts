import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ImageReq, SeoReq } from '../../../common/request/common.req';

@InputType('UpdateArticleReq')
export class UpdateArticleReq extends SeoReq {
  @IsOptional()
  @IsNotEmpty()
  @Field()
  cover: ImageReq;

  @IsOptional()
  @IsArray()
  @Field(() => [ImageReq])
  images: ImageReq[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field()
  author: string;

  @IsOptional()
  @IsString()
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @Field()
  content: string;

  @IsOptional()
  @IsString()
  @Field()
  slug: string;
}
