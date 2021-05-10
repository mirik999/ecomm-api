import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SliderDocument = Slider & Document;

@Schema()
export class Slider {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop({ unique: true, trim: true })
  name: string;

  @Prop()
  images: string[];

  @Prop()
  vertical: boolean;

  @Prop()
  fade: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  isDisabled: boolean;
}

export const SliderSchema = SchemaFactory.createForClass(Slider);
