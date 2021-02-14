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
import { GetElementsInput } from '../global-inputs/get-elements.input';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';
import { User } from '../utils/user.decorator';
import { UserRes } from '../user/response/user.res';

@Resolver(() => ProductRes)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => ProductRes)
  async getProduct(@Args('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Query(() => ProductsRes)
  getProducts( @Args('controls') controls: GetElementsInput) {
    return this.productService.getProducts(controls);
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

  @Mutation(() => GetByIdsOutput)
  disableProducts(
    @User() user: Partial<UserRes>,
    @Args('disabledProducts') disabledProducts: GetByIdsInput,
  ) {
    return this.productService.disableProducts(disabledProducts, user);
  }

  @Mutation(() => GetByIdsOutput)
  activateProducts(
    @User() user: Partial<UserRes>,
    @Args('activateProducts') activateProducts: GetByIdsInput,
  ) {
    return this.productService.activateProducts(activateProducts, user);
  }

  @Mutation(() => GetByIdsOutput)
  deleteProducts(
    @User() user: Partial<UserRes>,
    @Args('deleteProducts') deleteProducts: GetByIdsInput,
  ) {
    return this.productService.deleteProducts(deleteProducts);
  }

  @ResolveField(() => [CategoryRes])
  async category(@Parent() product: ProductRes) {
    return await this.categoryService.getCategoriesByIds(product.category);
  }
}
