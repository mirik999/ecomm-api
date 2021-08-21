import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema } from '../../common/schema/common.schema';

export type CouponDocument = Coupon & Document;

@Schema()
class CouponKey {
  @Prop()
  used: boolean;

  @Prop()
  key: string;
}
export const CouponKeySchema = SchemaFactory.createForClass(CouponKey);

@Schema()
export class Coupon extends DefaultSchema {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: [String], enum: ['product', 'category', 'brand', 'all'] })
  type: string[];

  @Prop({ type: [CouponKeySchema] })
  couponList: CouponKey[];

  @Prop()
  value: number;

  @Prop()
  endDate: Date;

  @Prop()
  used: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
