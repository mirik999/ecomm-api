import { Query, Resolver } from '@nestjs/graphql';
import { CommonStatistics } from './response/cpu.res';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';

@Resolver(() => CommonStatistics)
export class StatisticResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => CommonStatistics)
  async getAll(): Promise<CommonStatistics> {
    const productStats = await this.productService.collectStatistics();
    const categoryStats = await this.categoryService.collectStatistics();

    return {
      product: productStats,
      category: categoryStats,
    };
  }
}
