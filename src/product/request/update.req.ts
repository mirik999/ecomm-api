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

@InputType('UpdateProductReq')
export class UpdateProductReq {
  @IsOptional()
  @IsUUID()
  @Field()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(24)
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  images: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  cover: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  color: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  group: string;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true, defaultValue: 0 })
  sold: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  createdAt: string;

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
  @Field({ nullable: true })
  best: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  sale: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isDisabled: boolean;

  //ref to categories
  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID], { nullable: true })
  category: string[];
}
