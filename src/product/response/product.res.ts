import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../../category/category.type';

@ObjectType('ProductRes')
export class ProductRes {
  @Field(() => ID)
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
  group: string;

  @Field({ nullable: true })
  sold: number;

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

  @Field(() => [CategoryType])
  category: string[];

  @Field(() => [String], { nullable: true })
  comment: string[];
}

@ObjectType('ProductsRes')
export class ProductsRes {
  @Field()
  count: number;

  @Field(() => [ProductRes!]!)
  payload: ProductRes[];
}
