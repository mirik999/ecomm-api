import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpdateCategoryInput } from './input/update.input';
import { CategorySelf, CategoryType } from './category.type';
import { User } from '../utils/user.decorator';
import { JwtPayload } from '../utils/jwt.strategy';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput } from '../global-inputs/get-by-ids.input';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => CategorySelf)
  getCategoryById(@Args('id') id: string): Promise<CategorySelf> {
    return this.categoryService.getCategoryById(id);
  }

  @Query(() => CategoryType)
  getCategories(
    @Args('controls') controls: GetElementsInput,
  ): Promise<CategoryType> {
    return this.categoryService.getCategories(controls);
  }

  @Mutation(() => CategorySelf)
  createCategory(
    @User() user: JwtPayload,
    @Args('newCategory')
    newCategory: UpdateCategoryInput,
  ): Promise<CategorySelf> {
    return this.categoryService.createCategory(newCategory, user);
  }

  @Mutation(() => CategorySelf)
  updateCategory(
    @User() user: JwtPayload,
    @Args('updatedCategory')
    updatedCategory: UpdateCategoryInput,
  ): Promise<CategorySelf> {
    return this.categoryService.updateCategory(updatedCategory);
  }

  @Mutation(() => CategorySelf)
  disableCategories(
    @User() user: JwtPayload,
    @Args('disabledCategories')
    disabledCategories: GetByIdsInput,
  ) {
    return this.categoryService.disableCategories(disabledCategories);
  }

  @Mutation(() => CategorySelf)
  activateCategories(
    @User() user: JwtPayload,
    @Args('activateCategories')
    activateCategories: GetByIdsInput,
  ) {
    return this.categoryService.activateCategories(activateCategories);
  }
}
