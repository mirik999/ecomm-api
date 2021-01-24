import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CommentGateway } from './comment.gateway';

@Module({
  providers: [CommentResolver, CommentService, CommentGateway],
})
export class CommentModule {}
