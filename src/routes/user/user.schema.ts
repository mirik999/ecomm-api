import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ index: true, trim: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  roles: string[];

  @Prop()
  createdAt: string;

  @Prop()
  isDisabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
