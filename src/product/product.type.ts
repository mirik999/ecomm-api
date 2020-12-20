import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../category/category.type';

@ObjectType('Product')
export class ProductType {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field({ nullable: true })
  cover: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field(() => [Number], { nullable: true })
  stars: number[];

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  viewCount: number;

  @Field({ nullable: true })
  wishlistCount: number;

  @Field({ nullable: true })
  saleCount: number;

  @Field({ nullable: true })
  new: boolean;

  @Field({ nullable: true })
  best: boolean;

  @Field({ nullable: true })
  sale: boolean;

  @Field({ nullable: true })
  isDisabled: boolean;

  //category ref
  @Field((type) => [CategoryType])
  category: string[];
}
