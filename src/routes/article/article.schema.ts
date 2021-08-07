import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ImageSchema, SeoSchema } from '../../common/schema/common.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article extends SeoSchema {
  @Prop()
  cover: ImageSchema;

  @Prop([ImageSchema])
  images: ImageSchema[];

  @Prop({ trim: true })
  author: string;

  @Prop({ trim: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  slug: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
