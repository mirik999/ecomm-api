import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema, ImageSchema } from '../../common/schema/common.schema';

export type SliderDocument = Slider & Document;

@Schema()
export class Slider extends DefaultSchema {
  @Prop({ unique: true, trim: true })
  name: string;

  @Prop()
  images: ImageSchema[];

  @Prop()
  vertical: boolean;

  @Prop()
  fade: boolean;
}

export const SliderSchema = SchemaFactory.createForClass(Slider);
