import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop()
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ trim: true })
  keywords: string;

  @Prop({ trim: true })
  title: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
