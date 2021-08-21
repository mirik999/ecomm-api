import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  CountryCodes,
  CountryCodesTypeSchema,
} from '../../utils/country-codes.type';
import { DefaultSchema } from '../../common/schema/common.schema';

export type TranslationDocument = Translation & Document;

@Schema()
export class Translation extends DefaultSchema {
  @Prop({ trim: true, unique: true })
  keyword: string;

  @Prop({ trim: true, type: CountryCodesTypeSchema })
  translation: CountryCodes;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
