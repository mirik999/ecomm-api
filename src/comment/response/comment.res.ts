import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRes } from '../../user/response/user.res';

@ObjectType('ReplyRes')
export class ReplyRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID, { nullable: true })
  commentId: string;

  @Field(() => UserRes, { nullable: true })
  author: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  createdAt: string;
}

@ObjectType('CommentRes')
export class CommentRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID, { nullable: true })
  productId: string;

  @Field(() => UserRes, { nullable: true })
  author: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  createdAt: string;

  @Field(() => [ReplyRes], { nullable: true })
  reply: ReplyRes[];
}

@ObjectType('CommentsRes')
export class CommentsRes {
  @Field()
  count: number;

  @Field(() => [CommentRes])
  payload: CommentRes[];
}
