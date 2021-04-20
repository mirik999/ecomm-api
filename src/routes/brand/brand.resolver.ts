import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { BrandRes, BrandsRes } from './response/brand.res';
import { GetReq } from '../../common/request/get.req';
import { CreateBrandReq } from './request/create.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { UpdateBrandReq } from './request/update.req';
import { CategoryRes } from '../category/response/category.res';
import { CategoryService } from '../category/category.service';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => BrandRes)
export class BrandResolver {
  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => BrandRes)
  async getBrandById(@Args('id') id: string) {
    return this.brandService.getBrandById(id);
  }

  @Query(() => BrandsRes)
  getBrands(@Args('controls') controls: GetReq) {
    return this.brandService.getBrands(controls);
  }

  @Query(() => [BrandRes])
  getBrandsByCategoryId(@Args('id') id: string) {
    return this.brandService.getBrandsByCategoryId(id);
  }

  @Mutation(() => BrandRes)
  createBrand(
    @User() user: Partial<UserRes>,
    @Args('newBrand') newBrand: CreateBrandReq
  ) {
    return this.brandService.createBrand(newBrand)
  }

  @Mutation(() => BrandRes)
  updateBrand(
    @User() user: Partial<UserRes>,
    @Args('updatedBrand')
      updatedBrand: UpdateBrandReq,
  ) {
    return this.brandService.updateBrand(updatedBrand);
  }

  @Mutation(() => BrandRes)
  disableBrands(
    @User() user: Partial<UserRes>,
    @Args('disabledBrands')
      disabledBrands: GetByIdsReq,
  ) {
    return this.brandService.disableBrands(disabledBrands);
  }

  @Mutation(() => BrandRes)
  activateBrands(
    @User() user: Partial<UserRes>,
    @Args('activateBrands')
      activateBrands: GetByIdsReq,
  ) {
    return this.brandService.activateBrands(activateBrands);
  }

  @Mutation(() => GetByIdsRes)
  deleteBrands(
    @User() user: Partial<UserRes>,
    @Args('deleteBrands') deleteBrands: GetByIdsReq,
  ) {
    return this.brandService.deleteBrands(deleteBrands);
  }

  @ResolveField(() => [CategoryRes])
  category(@Parent() brand: BrandRes) {
    return this.categoryService.getCategoriesByIds(brand.category);
  }
}
