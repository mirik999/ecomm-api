import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { DefaultReq } from '../../../common/request/common.req';

@InputType()
export class CreateCommentReq extends DefaultReq {
  @IsUUID()
  @Field()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Field()
  message: string;

  @Field(() => [String], { nullable: true })
  reply: string[];
}

@InputType()
export class CreateReplyReq extends DefaultReq {
  @IsUUID()
  @Field()
  commentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @Field()
  message: string;
}
