import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema()
export class Brand {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop({ unique: true, trim: true })
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isDisabled: boolean;

  @Prop()
  category: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
