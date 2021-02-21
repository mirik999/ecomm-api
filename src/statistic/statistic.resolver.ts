import { Query, Resolver } from '@nestjs/graphql';
import { CommonStatistics } from './response/cpu.res';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';

@Resolver(() => CommonStatistics)
export class StatisticResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private commentService: CommentService,
  ) {}

  @Query(() => CommonStatistics)
  async getAll(): Promise<CommonStatistics> {
    const productStats = await this.productService.collectStatistics();
    const categoryStats = await this.categoryService.collectStatistics();
    const commentStats = await this.commentService.collectStatistics();

    return {
      product: productStats,
      comments: commentStats,
      category: categoryStats,
    };
  }
}
