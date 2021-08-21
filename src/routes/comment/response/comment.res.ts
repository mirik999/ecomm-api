import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRes } from '../../user/response/user.res';
import { DefaultRes } from '../../../common/response/common.res';

@ObjectType('ReplyRes')
export class ReplyRes extends DefaultRes {
  @Field(() => ID, { nullable: true })
  commentId: string;

  @Field(() => UserRes, { nullable: true })
  author: string;

  @Field({ nullable: true })
  message: string;
}

@ObjectType('CommentRes')
export class CommentRes extends DefaultRes {
  @Field(() => ID, { nullable: true })
  productId: string;

  @Field(() => UserRes, { nullable: true })
  author: string;

  @Field({ nullable: true })
  message: string;

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
