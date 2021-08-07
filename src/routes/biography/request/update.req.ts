import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ImageReq, SeoReq } from '../../../common/request/common.req';

@InputType()
export class UpdateBiographyReq extends SeoReq {
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsString()
  @Field({ nullable: true })
  content: string;

  @IsOptional()
  @IsArray()
  @Field(() => [ImageReq], { nullable: true })
  images: ImageReq[];
}
