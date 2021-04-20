import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateCommentReq {
  @IsUUID()
  @Field()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Field()
  message: string;
}

@InputType()
export class CreateReplyReq {
  @IsUUID()
  @Field()
  commentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Field()
  message: string;
}
