import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema } from '../../common/schema/common.schema';

export type CategoryDocument = Category & Document;

@Schema()
class SubCategory extends DefaultSchema {
  @Prop()
  parentId: string;

  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  tabName: string;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

@Schema()
export class Category extends DefaultSchema {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  tabName: string;

  @Prop({ type: [SubCategorySchema] })
  subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
