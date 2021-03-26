import { Module } from '@nestjs/common';
import { CouponResolver } from './coupon.resolver';
import { CouponService } from './coupon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './coupon.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Coupon.name,
        useFactory: async () => {
          const schema = CouponSchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique'
          });
          return schema;
        }
      }
    ])
  ],
  providers: [CouponResolver, CouponService],
  exports: [CouponService],
})
export class CouponModule {}
