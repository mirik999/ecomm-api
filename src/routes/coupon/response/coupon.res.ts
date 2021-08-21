import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DefaultRes } from '../../../common/response/common.res';

@ObjectType('CouponKeyRes')
export class CouponKeyRes {
  @Field()
  used: boolean;

  @Field()
  key: string;
}

@ObjectType('CouponRes')
export class CouponRes extends DefaultRes {
  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  type: string[];

  @Field(() => [CouponKeyRes], { nullable: true })
  couponList: CouponKeyRes[];

  @Field({ nullable: true })
  value: number;

  @Field({ nullable: true })
  used: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  endDate: Date;
}

@ObjectType('CouponsRes')
export class CouponsRes {
  @Field()
  count: number;

  @Field(() => [CouponRes])
  payload: CouponRes[];
}
