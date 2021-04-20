import { Args, Query, Resolver } from '@nestjs/graphql';
import { CommonStatistics } from './response/cpu.res';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';
import { BrandService } from '../brand/brand.service';
import { DateRangeReq } from '../../common/request/date-range.req';

@Resolver(() => CommonStatistics)
export class StatisticResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private commentService: CommentService,
    private brandService: BrandService,
  ) {}

  @Query(() => CommonStatistics)
  async getAll(@Args('dateRange') dateRange: DateRangeReq): Promise<CommonStatistics> {
    const productStats = await this.productService.collectStatistics(dateRange);
    const commentStats = await this.commentService.collectStatistics();

    return {
      product: productStats,
      comments: commentStats,
    };
  }
}
