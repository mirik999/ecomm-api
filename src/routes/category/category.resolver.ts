import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { UpdateCategoryReq } from './request/update.req';
import { CategoryRes, CategoriesRes } from './response/category.res';
import { User } from '../../utils/user.decorator';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { CreateCategoryReq } from './request/create.req';
import { UserRes } from '../user/response/user.res';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => CategoryRes)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => CategoryRes)
  getCategoryById(@Args('id') id: string): Promise<CategoryRes> {
    return this.categoryService.getCategoryById(id);
  }

  @Query(() => CategoriesRes)
  getCategories(@Args('controls') controls: GetReq) {
    return this.categoryService.getCategories(controls);
  }

  @Mutation(() => CategoryRes)
  createCategory(
    @User() user: Partial<UserRes>,
    @Args('newCategory')
    newCategory: CreateCategoryReq,
  ) {
    return this.categoryService.createCategory(newCategory);
  }

  @Mutation(() => CategoryRes)
  updateCategory(
    @User() user: Partial<UserRes>,
    @Args('updatedCategory')
    updatedCategory: UpdateCategoryReq,
  ) {
    return this.categoryService.updateCategory(updatedCategory);
  }

  @Mutation(() => CategoryRes)
  disableCategories(
    @User() user: Partial<UserRes>,
    @Args('disabledCategories')
    disabledCategories: GetByIdsReq,
  ) {
    return this.categoryService.disableCategories(disabledCategories);
  }

  @Mutation(() => CategoryRes)
  activateCategories(
    @User() user: Partial<UserRes>,
    @Args('activateCategories')
    activateCategories: GetByIdsReq,
  ) {
    return this.categoryService.activateCategories(activateCategories);
  }

  @Mutation(() => GetByIdsRes)
  deleteCategories(
    @User() user: Partial<UserRes>,
    @Args('deleteCategories') deleteCategories: GetByIdsReq,
  ) {
    return this.categoryService.deleteCategories(deleteCategories);
  }
}
