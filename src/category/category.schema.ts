import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  tabName: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isDisabled: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
