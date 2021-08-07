import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema, ImageSchema } from '../../common/schema/common.schema';

export type BrandDocument = Brand & Document;

@Schema()
export class Brand extends DefaultSchema {
  @Prop({ unique: true, trim: true })
  name: string;

  @Prop()
  imageUrl: ImageSchema;

  @Prop()
  category: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
