import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from './coupon.schema';
import { CouponRes, CouponsRes } from './response/coupon.res';
import { UserRes } from '../user/response/user.res';
import { CreateCouponReq } from './request/create.req';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput, GetByIdsOutput } from '../global-inputs/get-by-ids.input';
import { UpdateCouponReq } from './request/update.req';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel('Coupon')
    private couponRepository: Model<CouponDocument>
  ) {}

  async getCoupon(id: string): Promise<CouponRes> {
    const coupon = await this.couponRepository.findOne({ id });
    if (coupon) {
      if (coupon.isDisabled) {
        throw new ConflictException('Coupon is disabled');
      } else {
        return coupon;
      }
    } else {
      throw new NotFoundException('Coupon not found');
    }
  }
//1616264112000
  async getCoupons(controls: GetElementsInput): Promise<CouponsRes> {
    try {
      const { offset, limit, keyword, to } = controls;
      const from = new Date(1616264112000)
      const coupons = await this.couponRepository.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: keyword, $options: 'i' } }],
            $expr: {
              $cond: [
                { $eq: [from, undefined] },
                true,
                { createdAt: from }
              ]
            }
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $facet: {
            stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
            stage2: [{ $skip: offset }, { $limit: limit }],
          },
        },
        {
          $unwind: '$stage1',
        },
        {
          $project: {
            count: '$stage1.count',
            payload: '$stage2',
          },
        },
      ]);

      return coupons[0];
    } catch (err) {
      throw new ConflictException(`Cant get coupons. [Error] => ${err.message}`);
    }
  }

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

  async updateCoupon(updatedCoupon: UpdateCouponReq, user: Partial<UserRes>): Promise<CouponRes> {
    try {
      const coupon = await this.couponRepository.findOne({
        id: updatedCoupon.id,
      });
      for (const key in updatedCoupon) {
        if (updatedCoupon.hasOwnProperty(key)) {
          coupon[key] = updatedCoupon[key];
        }
      }
      coupon.modifiedBy = user.email;
      return this.couponRepository.create(coupon);
    } catch (err) {
      throw new ConflictException(
        `Cant update a coupon [Error] => ${err.message}`,
      );
    }
  }

  async disableCoupons(
    disabledCoupons: GetByIdsInput,
    user: Partial<UserRes>
  ): Promise<GetByIdsOutput> {
    try {
      await this.couponRepository.updateMany(
        { id: { $in: disabledCoupons.ids } },
        { $set: { isDisabled: true, modifiedBy: user.email, } },
      );
      return disabledCoupons;
    } catch (err) {
      throw new ConflictException(`Cant disable coupons => ${err.message}`);
    }
  }

  async activateCoupons(
    activateCoupons: GetByIdsInput,
    user: Partial<UserRes>
  ): Promise<GetByIdsOutput> {
    try {
      await this.couponRepository.updateMany(
        { id: { $in: activateCoupons.ids } },
        { $set: { isDisabled: false, modifiedBy: user.email, } },
      );
      return activateCoupons;
    } catch (err) {
      throw new ConflictException(`Cant activate coupons => ${err.message}`);
    }
  }

  async deleteCoupons(
    deleteCoupons: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.couponRepository.deleteMany(
        { id: { $in: deleteCoupons.ids } }
      );
      return deleteCoupons;
    } catch (err) {
      throw new ConflictException(`Cant delete coupons => ${err.message}`);
    }
  }

  @Cron('*/30 * * * *')
  private async handleCoupon() {
    try {
      const coupons: Coupon[] = await this.couponRepository.find({ isDisabled: false });
      for await (const coupon of coupons) {
        if (new Date() >= coupon.endDate) {
          await this.couponRepository.updateOne(
            { id: coupon.id },
            { $set: { isDisabled: true, modifiedBy: 'CRON', } }
          )
        }
      }
    } catch(err) {
      throw new ConflictException(`Cant read coupons [CRON] => ${err.message}`);
    }
  }
}
