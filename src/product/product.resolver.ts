import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { ProductType } from './product.type';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category.schema';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => ProductType)
  async getProduct(
    @Args('id') id: string
  ): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Query(() => [ProductType])
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Mutation(() => ProductType)
  createProduct(
    @Args('createProductDto')
      newProduct: CreateProductDto
  ): Promise<Product> {
    return this.productService.createProduct(newProduct);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('updateProductDto')
      updatedProduct: UpdateProductDto
  ): Promise<Product> {
    return this.productService.updateProduct(updatedProduct);
  }

  @ResolveField()
  async category(@Parent() product: Product): Promise<Category[]> {
    return this.categoryService.getCategory(product.category);
  }
}
