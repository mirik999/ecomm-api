import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductType, ProductsType } from './product.type';
import { CreateProductInput } from './input/create.input';
import { UpdateProductInput } from './input/update.input';
import { CategoryService } from '../category/category.service';
import { CategoryType } from '../category/category.type';
import { JwtPayload } from '../utils/jwt.strategy';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';
import { User } from '../utils/user.decorator';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => ProductType)
  async getProduct(@Args('id') id: string): Promise<ProductType> {
    return this.productService.getProduct(id);
  }

  @Query(() => ProductsType)
  getProducts(
    @Args('controls') controls: GetElementsInput,
  ): Promise<ProductsType> {
    return this.productService.getProducts(controls);
  }

  @Mutation(() => ProductType)
  createProduct(
    @User() user: JwtPayload,
    @Args('newProduct')
    newProduct: CreateProductInput,
  ): Promise<ProductType> {
    return this.productService.createProduct(newProduct);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @User() user: JwtPayload,
    @Args('updatedProduct')
    updatedProduct: UpdateProductInput,
  ): Promise<ProductType> {
    return this.productService.updateProduct(updatedProduct);
  }

  @Mutation(() => GetByIdsOutput)
  disableProducts(
    @User() user: JwtPayload,
    @Args('disabledProducts')
    disabledProducts: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    return this.productService.disableProducts(disabledProducts);
  }

  @Mutation(() => GetByIdsOutput)
  activateProducts(
    @User() user: JwtPayload,
    @Args('activateProducts')
    activateProducts: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    return this.productService.activateProducts(activateProducts);
  }

  @ResolveField(() => [CategoryType])
  async category(@Parent() product: ProductType): Promise<CategoryType[]> {
    return await this.categoryService.getCategoriesByIds(product.category);
  }
}
