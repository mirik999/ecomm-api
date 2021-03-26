import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CouponDocument } from './coupon.schema';
import { CouponRes } from './response/coupon.res';
import { UserRes } from '../user/response/user.res';
import { CreateCouponReq } from './request/create.req';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel('Coupon')
    private couponRepository: Model<CouponDocument>
  ) {}

  async createCoupon(user: UserRes, newCoupon: CreateCouponReq): Promise<CouponRes> {
    try {
      return this.couponRepository.create({
        id: newCoupon.id,
        name: newCoupon.name,
        type: newCoupon.type,
        value: newCoupon.value,
        used: 0,
        description: newCoupon.description,
        createdAt: new Date(),
        endDate: newCoupon.endDate,
        createdBy: user.email,
        modifiedBy: null,
        isDisabled: false,
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a coupon. [Error] => ${err.message}`,
      );
    }
  }
}
