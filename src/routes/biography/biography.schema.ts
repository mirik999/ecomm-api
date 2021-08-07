import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ImageReq } from '../../common/request/common.req';
import { SeoSchema } from '../../common/schema/common.schema';

export type BiographyDocument = Biography & Document;

@Schema()
export class Biography extends SeoSchema {
  @Prop({ unique: true, trim: true })
  name: string;

  @Prop()
  content: string;

  @Prop([ImageReq])
  images: ImageReq[];
}

export const BiographySchema = SchemaFactory.createForClass(Biography);
