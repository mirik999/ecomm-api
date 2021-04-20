import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductRes, ProductsRes } from './response/product.res';
import { CreateProductReq } from './request/create.req';
import { UpdateProductReq } from './request/update.req';
import { CategoryService } from '../category/category.service';
import { CategoryRes } from '../category/response/category.res';
import { GetReq } from '../../common/request/get.req';
import {
  GetByIdsReq
} from '../../common/request/get-by-ids.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { BrandRes } from '../brand/response/brand.res';
import { BrandService } from '../brand/brand.service';
import { CouponRes } from '../coupon/response/coupon.res';
import { CouponService } from '../coupon/coupon.service';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => ProductRes)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private couponService: CouponService,
  ) {}

  @Query(() => ProductRes)
  async getProduct(@Args('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Query(() => ProductsRes)
  getProducts( @Args('controls') controls: GetReq) {
    return this.productService.getProducts(controls);
  }

  @Query(() => [ProductRes])
  getProductsByCategoryId(@Args('id') id: string) {
    return this.productService.getProductsByCategoryId(id);
  }

  @Mutation(() => ProductRes)
  createProduct(
    @User() user: Partial<UserRes>,
    @Args('newProduct') newProduct: CreateProductReq,
  ) {
    return this.productService.createProduct(newProduct, user);
  }

  @Mutation(() => ProductRes)
  updateProduct(
    @User() user: Partial<UserRes>,
    @Args('updatedProduct') updatedProduct: UpdateProductReq,
  ) {
    return this.productService.updateProduct(updatedProduct, user);
  }

  @Mutation(() => GetByIdsRes)
  disableProducts(
    @User() user: Partial<UserRes>,
    @Args('disabledProducts') disabledProducts: GetByIdsReq,
  ) {
    return this.productService.disableProducts(disabledProducts, user);
  }

  @Mutation(() => GetByIdsRes)
  activateProducts(
    @User() user: Partial<UserRes>,
    @Args('activateProducts') activateProducts: GetByIdsReq,
  ) {
    return this.productService.activateProducts(activateProducts, user);
  }

  @Mutation(() => GetByIdsRes)
  deleteProducts(
    @User() user: Partial<UserRes>,
    @Args('deleteProducts') deleteProducts: GetByIdsReq,
  ) {
    return this.productService.deleteProducts(deleteProducts);
  }

  @ResolveField(() => [CategoryRes])
  category(@Parent() product: ProductRes) {
    return this.categoryService.getCategoriesByIds(product.category);
  }

  @ResolveField(() => BrandRes)
  brand(@Parent() product: ProductRes) {
    return this.brandService.getBrandById(product.brand);
  }

  @ResolveField(() => CouponRes)
  coupon(@Parent() product: ProductRes) {
    return this.couponService.getCouponById(product.coupon);
  }
}
