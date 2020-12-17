import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { ProductType } from './product.type';
import { UpdateProductDto } from './dto/update.dto';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

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

  // @Query(() => ProductType)
  // disableProduct(@User() user: JwtPayload): Promise<Product> {
  //   return this.productService.disableProduct(user);
  // }

  @Mutation(() => ProductType)
  createProduct(
    @Args('UpdateProductDto')
      updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.createProduct(updateProductDto);
  }
}
