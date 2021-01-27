import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop([String])
  images: string[];

  @Prop()
  cover: string;

  @Prop()
  color: string;

  @Prop()
  group: string;

  @Prop()
  sold: number;

  @Prop()
  description: string;

  @Prop()
  createdAt: string;

  @Prop([Number])
  stars: number[];

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
  category: string[];

  @Prop()
  comment: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
