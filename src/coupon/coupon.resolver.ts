import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { User } from '../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { CouponRes } from './response/coupon.res';
import { CreateCouponReq } from './request/create.req';

@Resolver(() => CouponRes)
export class CouponResolver {
  constructor(
    private couponService: CouponService
  ) {}

  @Mutation(() => CouponRes)
  createCoupon(
    @User() user: UserRes,
    @Args('newCoupon') newCoupon: CreateCouponReq
  ) {
    return this.couponService.createCoupon(user, newCoupon);
  }
}
