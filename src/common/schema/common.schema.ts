import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class DefaultSchema {
  @Prop({ index: true, unique: true })
  id: string;

  @Prop()
  createdBy: string;

  @Prop()
  modifiedBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isDisabled: boolean;
}

@Schema()
export class SeoSchema extends DefaultSchema {
  @Prop()
  keywords: string;

  @Prop()
  description: string;

  @Prop()
  htmlTitle: string;
}

@Schema()
export class ImageSchema {
  @Prop()
  src: string;

  @Prop()
  alt: string;

  @Prop()
  videoId: string;

  @Prop()
  link: string;
}
