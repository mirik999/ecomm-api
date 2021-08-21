import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CommentDocument } from './comment.schema';
import { CreateCommentReq, CreateReplyReq } from './request/create.req';
import { CommentRes, CommentsRes, ReplyRes } from './response/comment.res';
import { GetReq } from '../../common/request/get.req';
import { UserRes } from '../user/response/user.res';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private commentRepository: Model<CommentDocument>,
  ) {}

  async getComments(productId: string, controls: GetReq): Promise<CommentsRes> {
    const { offset, limit } = controls;
    try {
      const comments = await this.commentRepository.aggregate([
        {
          $match: { productId },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $facet: {
            stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
            stage2: [{ $skip: offset }, { $limit: limit }],
          },
        },
        {
          $unwind: '$stage1',
        },
        {
          $project: {
            count: '$stage1.count',
            payload: '$stage2',
          },
        },
      ]);
      return comments[0];
    } catch (err) {
      throw new NotFoundException(
        `Could not find comments. [Error] => ${err.message}`,
      );
    }
  }

  async createComment(
    user: Partial<UserRes>,
    newComment: CreateCommentReq,
  ): Promise<CommentRes> {
    try {
      return this.commentRepository.create({
        id: uuid(),
        productId: newComment.productId,
        author: user.id,
        message: newComment.message,
        createdAt: new Date(),
        createdBy: user.email,
        modifiedBy: user.email,
        isDisabled: false,
        reply: [],
      });
    } catch (err) {
      throw new ConflictException(
        `Could not create a comment. [Error] => ${err.message}`,
      );
    }
  }

  async createReply(
    newReply: CreateReplyReq,
    user: UserRes,
  ): Promise<ReplyRes> {
    const reply = {
      ...newReply,
      id: uuid(),
      author: user.id,
      createdAt: new Date(),
    };
    try {
      await this.commentRepository.updateOne(
        {
          id: newReply.commentId,
        },
        {
          $push: { reply: reply },
        },
      );
      return reply;
    } catch (err) {
      throw new ConflictException(
        `Could not create a comment. [Error] => ${err.message}`,
      );
    }
  }

  async collectStatistics(): Promise<number> {
    try {
      return this.commentRepository.countDocuments();
    } catch (err) {
      throw new ConflictException(
        `Could not count comments [Error] => ${err.message}`,
      );
    }
  }
}
