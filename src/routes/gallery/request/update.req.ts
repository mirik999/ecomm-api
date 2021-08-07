import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ImageReq, SeoReq } from '../../../common/request/common.req';

@InputType()
export class UpdateGalleryReq extends SeoReq {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsArray()
  @Field(() => [ImageReq], { nullable: true })
  images: ImageReq[];
}
