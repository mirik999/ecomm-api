import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpdateCategoryReq } from './request/update.req';
import { CategoryRes, CategoriesRes } from './response/category.res';
import { User } from '../utils/user.decorator';
import { JwtPayload } from '../utils/jwt.strategy';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput, GetByIdsOutput } from '../global-inputs/get-by-ids.input';
import { CreateCategoryReq } from './request/create.req';

@Resolver(() => CategoryRes)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => CategoryRes)
  getCategoryById(@Args('id') id: string): Promise<CategoryRes> {
    return this.categoryService.getCategoryById(id);
  }

  @Query(() => CategoriesRes)
  getCategories(
    @Args('controls') controls: GetElementsInput,
  ): Promise<CategoriesRes> {
    return this.categoryService.getCategories(controls);
  }

  @Mutation(() => CategoryRes)
  createCategory(
    @User() user: JwtPayload,
    @Args('newCategory')
    newCategory: CreateCategoryReq,
  ): Promise<CategoryRes> {
    return this.categoryService.createCategory(newCategory);
  }

  @Mutation(() => CategoryRes)
  updateCategory(
    @User() user: JwtPayload,
    @Args('updatedCategory')
    updatedCategory: UpdateCategoryReq,
  ): Promise<CategoryRes> {
    return this.categoryService.updateCategory(updatedCategory);
  }

  @Mutation(() => CategoryRes)
  disableCategories(
    @User() user: JwtPayload,
    @Args('disabledCategories')
    disabledCategories: GetByIdsInput,
  ) {
    return this.categoryService.disableCategories(disabledCategories);
  }

  @Mutation(() => CategoryRes)
  activateCategories(
    @User() user: JwtPayload,
    @Args('activateCategories')
    activateCategories: GetByIdsInput,
  ) {
    return this.categoryService.activateCategories(activateCategories);
  }

  @Mutation(() => GetByIdsOutput)
  deleteCategories(
    @User() user: JwtPayload,
    @Args('deleteCategories') deleteCategories: GetByIdsInput,
  ) {
    return this.categoryService.deleteCategories(deleteCategories);
  }
}
