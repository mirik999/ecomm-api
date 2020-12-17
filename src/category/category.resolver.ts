import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update.dto';
import { Category } from './category.schema';
import { CategoryType } from './category.type';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  getProducts(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Mutation(() => CategoryType)
  createProduct(
    @Args('updateCategoryDto')
      updateProductDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createProduct(updateProductDto);
  }

}