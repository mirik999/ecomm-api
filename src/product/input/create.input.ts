import { Field, ID, InputType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
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

@InputType()
export class CreateProductInput {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true, defaultValue: uuid() })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(24)
  @Field()
  name: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { defaultValue: [] })
  images: string[];

  @IsString()
  @IsNotEmpty()
  @Field()
  cover: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  color: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  description: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: new Date().toString() })
  createdAt: string;

  @IsOptional()
  @IsArray()
  @Field(() => [Number], { defaultValue: [] })
  stars: number[];

  @IsNumber()
  @IsNotEmpty()
  @Field()
  price: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true, defaultValue: 0 })
  viewCount: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true, defaultValue: 0 })
  wishlistCount: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true, defaultValue: 0 })
  saleCount: number;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: true })
  new: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  best: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  sale: boolean;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  isDisabled: boolean;

  //ref to categories
  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  category: string[];
}
