import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentReq, CreateReplyReq } from './request/create.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { CommentRes, CommentsRes, ReplyRes } from './response/comment.res';
import { GetReq } from '../../common/request/get.req';
import { UserService } from '../user/user.service';

@Resolver(() => CommentRes)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  @Query(() => CommentsRes)
  getComments(
    @Args('productId') productId: string,
    @Args('controls') controls: GetReq,
  ) {
    return this.commentService.getComments(productId, controls);
  }

  @Mutation(() => CommentRes)
  createComment(
    @User() user: UserRes,
    @Args('newComment') newComment: CreateCommentReq,
  ) {
    return this.commentService.createComment(user, newComment);
  }

  @Mutation(() => ReplyRes)
  createReply(
    @User() user: UserRes,
    @Args('newReply') newReply: CreateReplyReq,
  ) {
    return this.commentService.createReply(newReply, user);
  }

  @ResolveField(() => UserRes)
  async author(@Parent() comment: CommentRes) {
    return this.userService.getCommentAuthor(comment.author);
  }

  @ResolveField(() => CommentRes)
  async reply(@Parent() comment: CommentRes) {
    return comment.reply.map(async (reply) => {
      const author = await this.userService.getCommentAuthor(reply.author);
      return {
        ...reply,
        author,
      };
    });
  }
}
