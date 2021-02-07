import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
class SubCategory {
  @Prop()
  name: string;

  @Prop()
  tabName: string;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

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

  @Prop({ type: [SubCategorySchema] })
  subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
