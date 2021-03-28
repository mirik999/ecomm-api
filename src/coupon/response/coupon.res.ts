import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CouponRes')
export class CouponRes {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  type: string[];

  @Field({ nullable: true })
  value: number;

  @Field({ nullable: true })
  used: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  endDate: string;

  @Field({ nullable: true })
  createdBy: string;

  @Field({ nullable: true })
  modifiedBy: string;

  @Field({ nullable: true })
  isDisabled: boolean;
}

@ObjectType('CouponsRes')
export class CouponsRes {
  @Field()
  count: number;

  @Field(() => [CouponRes])
  payload: CouponRes[];
}
