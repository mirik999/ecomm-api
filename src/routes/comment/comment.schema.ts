import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema } from '../../common/schema/common.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Reply extends DefaultSchema {
  @Prop()
  commentId: string;

  @Prop()
  author: string;

  @Prop()
  message: string;
}
export const ReplySchema = SchemaFactory.createForClass(Reply);

@Schema()
export class Comment extends DefaultSchema {
  @Prop()
  productId: string;

  @Prop()
  author: string;

  @Prop()
  message: string;

  @Prop({ type: [ReplySchema] })
  reply: Reply[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
