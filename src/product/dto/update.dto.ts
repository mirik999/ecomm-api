import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsArray()
  @IsString()
  @Field({ nullable: true })
  images: string[];

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  cover: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  color: string;

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
  @IsNumber()
  @Field({ nullable: true })
  stars: number[];

  @IsOptional()
  @IsNumber()
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
  @IsString()
  @Field({ nullable: true })
  categoryId: string;
}