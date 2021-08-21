import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DefaultReq, ImageReq } from '../../../common/request/common.req';

@InputType('UpdateProductReq')
export class UpdateProductReq extends DefaultReq {
  @IsOptional()
  @IsString()
  @MaxLength(24)
  @Field()
  code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(24)
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsArray()
  @Field(() => [ImageReq], { nullable: true })
  images: ImageReq[];

  @IsOptional()
  @IsNotEmpty()
  @Field({ nullable: true })
  cover: ImageReq;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  color: string;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true, defaultValue: 0 })
  sold: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @IsArray()
  @Field(() => [Number], { nullable: true })
  stars: number[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Field({ nullable: true })
  price: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  viewCount: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  wishlistCount: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  saleCount: number;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  new: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  hasCoupon: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  used: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  defective: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  sale: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  freeDelivery: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  guarantee: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  best: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  pending: boolean;

  //ref to categories
  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID], { nullable: true })
  category: string[];

  //ref to brands
  @IsOptional()
  @IsUUID('4')
  @Field(() => ID, { nullable: true })
  brand: string;

  //ref to coupons
  @IsOptional()
  @IsUUID('4')
  @Field(() => ID, { nullable: true })
  coupon: string;
}
