import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ type: [String], enum: ['product', 'category', 'brand', 'all'] })
  type: string[];

  @Prop({ type: [String] })
  couponList: string[];

  @Prop()
  value: number;

  @Prop()
  createdAt: Date;

  @Prop()
  endDate: Date;

  @Prop()
  createdBy: string;

  @Prop()
  modifiedBy: string;

  @Prop()
  used: number;

  @Prop()
  isDisabled: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
