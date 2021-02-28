import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ unique: true, trim: true })
  articul: string;

  @Prop([String])
  images: string[];

  @Prop()
  cover: string;

  @Prop()
  color: string;

  @Prop()
  group: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: string;

  @Prop()
  createdBy: string;

  @Prop()
  modifiedBy: string;

  @Prop([Number])
  stars: number[];

  @Prop()
  sold: number;

  @Prop()
  price: number;

  @Prop()
  viewCount: number;

  @Prop()
  wishlistCount: number;

  @Prop()
  saleCount: number;

  @Prop()
  new: boolean;

  @Prop()
  best: boolean;

  @Prop()
  sale: boolean;

  @Prop()
  isDisabled: boolean;

  @Prop()
  freeDelivery: boolean;

  @Prop()
  guarantee: boolean;

  @Prop()
  category: string[];

  @Prop()
  brand: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
