import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpdateCategoryInput } from './input/update.input';
import { CategoryType, CategoriesType } from './category.type';
import { User } from '../utils/user.decorator';
import { JwtPayload } from '../utils/jwt.strategy';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput } from '../global-inputs/get-by-ids.input';
import { CreateCategoryInput } from './input/create.input';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => CategoryType)
  getCategoryById(@Args('id') id: string): Promise<CategoryType> {
    return this.categoryService.getCategoryById(id);
  }

  @Query(() => CategoriesType)
  getCategories(
    @Args('controls') controls: GetElementsInput,
  ): Promise<CategoriesType> {
    return this.categoryService.getCategories(controls);
  }

  @Mutation(() => CategoryType)
  createCategory(
    @User() user: JwtPayload,
    @Args('newCategory')
    newCategory: CreateCategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.createCategory(newCategory);
  }

  @Mutation(() => CategoryType)
  updateCategory(
    @User() user: JwtPayload,
    @Args('updatedCategory')
    updatedCategory: UpdateCategoryInput,
  ): Promise<CategoryType> {
    return this.categoryService.updateCategory(updatedCategory);
  }

  @Mutation(() => CategoryType)
  disableCategories(
    @User() user: JwtPayload,
    @Args('disabledCategories')
    disabledCategories: GetByIdsInput,
  ) {
    return this.categoryService.disableCategories(disabledCategories);
  }

  @Mutation(() => CategoryType)
  activateCategories(
    @User() user: JwtPayload,
    @Args('activateCategories')
    activateCategories: GetByIdsInput,
  ) {
    return this.categoryService.activateCategories(activateCategories);
  }
}
