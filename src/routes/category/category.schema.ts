import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
class SubCategory {
  @Prop({ index: true })
  id: string;

  @Prop()
  parentId: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  tabName: string;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

@Schema()
export class Category {
  @Prop({ index: true })
  id: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  tabName: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isDisabled: boolean;

  @Prop({ type: [SubCategorySchema] })
  subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
