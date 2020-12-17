import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../category/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  images: string[];

  @Prop()
  cover: string;

  @Prop()
  color: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: string;

  @Prop()
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

  //category ref
  // @Prop(type: [Types.ObjectId], ref: Category.name)
  @Prop()
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);