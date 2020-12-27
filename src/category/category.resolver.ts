import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update.dto';
import { Category } from './category.schema';
import { CategoryType } from './category.type';
import { User } from '../utils/user.decorator';
import { JwtPayload } from '../utils/jwt.strategy';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Mutation(() => CategoryType)
  createCategory(
    @User() user: JwtPayload,
    @Args('updateCategoryDto')
      updateProductDto: UpdateCategoryDto
  ): Promise<Category> {
    console.log('cas', user)
    return this.categoryService.createCategory(updateProductDto, user);
  }

}
