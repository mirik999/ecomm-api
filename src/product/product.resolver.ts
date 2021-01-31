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
import { CategoryType } from '../category/category.type';
import { JwtPayload } from '../utils/jwt.strategy';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';
import { User } from '../utils/user.decorator';

@Resolver(() => ProductRes)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => ProductRes)
  async getProduct(@Args('id') id: string): Promise<ProductRes> {
    return this.productService.getProduct(id);
  }

  @Query(() => ProductsRes)
  getProducts(@Args('controls') controls: GetElementsInput) {
    return this.productService.getProducts(controls);
  }

  @Mutation(() => ProductRes)
  createProduct(
    @User() user: JwtPayload,
    @Args('newProduct') newProduct: CreateProductReq,
  ) {
    return this.productService.createProduct(newProduct);
  }

  @Mutation(() => ProductRes)
  updateProduct(
    @User() user: JwtPayload,
    @Args('updatedProduct') updatedProduct: UpdateProductReq,
  ) {
    return this.productService.updateProduct(updatedProduct);
  }

  @Mutation(() => GetByIdsOutput)
  disableProducts(
    @User() user: JwtPayload,
    @Args('disabledProducts') disabledProducts: GetByIdsInput,
  ) {
    return this.productService.disableProducts(disabledProducts);
  }

  @Mutation(() => GetByIdsOutput)
  activateProducts(
    @User() user: JwtPayload,
    @Args('activateProducts') activateProducts: GetByIdsInput,
  ) {
    return this.productService.activateProducts(activateProducts);
  }

  @ResolveField(() => [CategoryType])
  async category(@Parent() product: ProductRes) {
    return await this.categoryService.getCategoriesByIds(product.category);
  }
}
