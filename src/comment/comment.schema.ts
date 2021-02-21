import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Reply {
  @Prop()
  id: string;

  @Prop()
  commentId: string;

  @Prop()
  author: string;

  @Prop()
  message: string;

  @Prop()
  createdAt: string;
}
export const ReplySchema = SchemaFactory.createForClass(Reply);

@Schema()
export class Comment {
  @Prop()
  id: string;

  @Prop()
  productId: string;

  @Prop()
  author: string;

  @Prop()
  message: string;

  @Prop()
  createdAt: string;

  @Prop({ type: [ReplySchema] })
  reply: Reply[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
