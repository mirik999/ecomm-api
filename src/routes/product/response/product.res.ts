import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryRes } from '../../category/response/category.res';
import { BrandRes } from '../../brand/response/brand.res';
import { CouponRes } from '../../coupon/response/coupon.res';
import { DefaultRes, ImageRes } from '../../../common/response/common.res';

@ObjectType('ProductRes')
export class ProductRes extends DefaultRes {
  @Field({ nullable: true })
  code: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [ImageRes], { nullable: true })
  images: ImageRes[];

  @Field({ nullable: true })
  cover: ImageRes;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  sold: number;

  @Field({ nullable: true })
  description: string;

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
  hasCoupon: boolean;

  @Field({ nullable: true })
  used: boolean;

  @Field({ nullable: true })
  defective: boolean;

  @Field({ nullable: true })
  best: boolean;

  @Field({ nullable: true })
  sale: boolean;

  @Field({ nullable: true })
  freeDelivery: boolean;

  @Field({ nullable: true })
  guarantee: boolean;

  @Field(() => [CategoryRes])
  category: string[];

  @Field(() => BrandRes, { nullable: true })
  brand: string;

  @Field(() => CouponRes, { nullable: true })
  coupon: string;
}

@ObjectType('ProductsRes')
export class ProductsRes {
  @Field()
  count: number;

  @Field(() => [ProductRes])
  payload: ProductRes[];
}
