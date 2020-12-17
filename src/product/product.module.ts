import { Product, ProductSchema } from './product.schema';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Product.name, schema: ProductSchema }
    ]
  )],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
