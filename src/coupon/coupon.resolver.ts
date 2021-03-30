import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { User } from '../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { CouponRes, CouponsRes } from './response/coupon.res';
import { CreateCouponReq } from './request/create.req';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput, GetByIdsOutput } from '../global-inputs/get-by-ids.input';
import { UpdateCouponReq } from './request/update.req';

@Resolver(() => CouponRes)
export class CouponResolver {
  constructor(
    private couponService: CouponService
  ) {}

  @Query(() => CouponRes)
  async getCoupon(@Args('id') id: string) {
    return this.couponService.getCoupon(id);
  }

  @Query(() => CouponsRes)
  getCoupons(@Args('controls') controls: GetElementsInput) {
    console.log(controls)
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

  @Mutation(() => GetByIdsOutput)
  disableCoupons(
    @User() user: Partial<UserRes>,
    @Args('disabledCoupons') disabledCoupons: GetByIdsInput,
  ) {
    return this.couponService.disableCoupons(disabledCoupons, user);
  }

  @Mutation(() => GetByIdsOutput)
  activateCoupons(
    @User() user: Partial<UserRes>,
    @Args('activateCoupons') activateCoupons: GetByIdsInput,
  ) {
    return this.couponService.activateCoupons(activateCoupons, user);
  }

  @Mutation(() => GetByIdsOutput)
  deleteCoupons(
    @User() user: Partial<UserRes>,
    @Args('deleteCoupons') deleteCoupons: GetByIdsInput,
  ) {
    return this.couponService.deleteCoupons(deleteCoupons);
  }
}
