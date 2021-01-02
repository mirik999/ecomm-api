import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { ProductSelf, ProductType } from './product.type';
import { CreateProductInput } from './input/create.input';
import { UpdateProductInput } from './input/update.input';
import { CategoryService } from '../category/category.service';
import { CategorySelf } from '../category/category.type';
import { JwtPayload } from '../utils/jwt.strategy';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput } from '../global-inputs/get-by-ids.input';
import { User } from '../utils/user.decorator';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => ProductSelf)
  async getProduct(@Args('id') id: string): Promise<ProductSelf> {
    return this.productService.getProduct(id);
  }

  @Query(() => ProductType)
  getProducts(
    @Args('controls') controls: GetElementsInput,
  ): Promise<ProductType> {
    return this.productService.getProducts(controls);
  }

  @Mutation(() => ProductSelf)
  createProduct(
    @Args('newProduct')
    newProduct: CreateProductInput,
  ): Promise<ProductSelf> {
    return this.productService.createProduct(newProduct);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('updatedProduct')
    updatedProduct: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.updateProduct(updatedProduct);
  }

  @Mutation(() => ProductType)
  disableProducts(
    @User() user: JwtPayload,
    @Args('disabledProducts')
    disabledProducts: GetByIdsInput,
  ) {
    return this.productService.disableProducts(disabledProducts);
  }

  @Mutation(() => ProductType)
  activateProducts(
    @User() user: JwtPayload,
    @Args('activateProducts')
    activateProducts: GetByIdsInput,
  ) {
    return this.productService.activateProducts(activateProducts);
  }

  @ResolveField('category', () => [CategorySelf])
  async getCategory(@Parent() product: ProductSelf): Promise<CategorySelf[]> {
    console.log('category resolve filed', product);
    return await this.categoryService.getCategory(product.category);
  }
}
