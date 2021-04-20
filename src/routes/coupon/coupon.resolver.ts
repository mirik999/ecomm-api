import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { CouponRes, CouponsRes } from './response/coupon.res';
import { CreateCouponReq } from './request/create.req';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { UpdateCouponReq } from './request/update.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => CouponRes)
export class CouponResolver {
  constructor(
    private couponService: CouponService
  ) {}

  @Query(() => CouponRes)
  async getCouponById(@Args('id') id: string) {
    return this.couponService.getCouponById(id);
  }

  @Query(() => CouponsRes)
  getCoupons(@Args('controls') controls: GetReq) {
    return this.couponService.getCoupons(controls);
  }

  @Mutation(() => CouponRes)
  createCoupon(
    @User() user: UserRes,
    @Args('newCoupon') newCoupon: CreateCouponReq
  ) {
    return this.couponService.createCoupon(user, newCoupon);
  }

  @Mutation(() => CouponRes)
  updateCoupon(
    @User() user: Partial<UserRes>,
    @Args('updatedCoupon') updatedCoupon: UpdateCouponReq,
  ) {
    return this.couponService.updateCoupon(updatedCoupon, user);
  }

  @Mutation(() => GetByIdsRes)
  disableCoupons(
    @User() user: Partial<UserRes>,
    @Args('disabledCoupons') disabledCoupons: GetByIdsReq,
  ) {
    return this.couponService.disableCoupons(disabledCoupons, user);
  }

  @Mutation(() => GetByIdsRes)
  activateCoupons(
    @User() user: Partial<UserRes>,
    @Args('activateCoupons') activateCoupons: GetByIdsReq,
  ) {
    return this.couponService.activateCoupons(activateCoupons, user);
  }

  @Mutation(() => GetByIdsRes)
  deleteCoupons(
    @User() user: Partial<UserRes>,
    @Args('deleteCoupons') deleteCoupons: GetByIdsReq,
  ) {
    return this.couponService.deleteCoupons(deleteCoupons);
  }
}
