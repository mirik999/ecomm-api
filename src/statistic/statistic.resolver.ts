import { Query, Resolver } from '@nestjs/graphql';
import { CommonStatistics } from './response/cpu.res';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';
import { BrandService } from '../brand/brand.service';

@Resolver(() => CommonStatistics)
export class StatisticResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private commentService: CommentService,
    private brandService: BrandService,
  ) {}

  @Query(() => CommonStatistics)
  async getAll(): Promise<CommonStatistics> {
    const productStats = await this.productService.collectStatistics();
    const categoryStats = await this.categoryService.collectStatistics();
    const commentStats = await this.commentService.collectStatistics();
    const brandStats = await this.brandService.collectStatistics();

    return {
      product: productStats,
      comments: commentStats,
      category: categoryStats,
      brand: brandStats
    };
  }
}
