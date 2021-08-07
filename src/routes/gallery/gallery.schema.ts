import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ImageReq } from '../../common/request/common.req';
import { SeoSchema } from '../../common/schema/common.schema';

export type GalleryDocument = Gallery & Document;

@Schema()
export class Gallery extends SeoSchema {
  @Prop({ unique: true, trim: true })
  name: string;

  @Prop([ImageReq])
  images: ImageReq[];
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
