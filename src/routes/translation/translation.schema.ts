import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CountryCodes,
  CountryCodesTypeSchema,
} from '../../utils/country-codes.type';

export type TranslationDocument = Translation & Document;

@Schema()
export class Translation {
  @Prop({ index: true })
  id: string;

  @Prop({ trim: true, unique: true })
  keyword: string;

  @Prop({ trim: true, type: CountryCodesTypeSchema })
  translation: CountryCodes;

  @Prop()
  createdAt: Date;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
