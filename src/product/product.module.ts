import { Product, ProductSchema } from './product.schema';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ]),
    CategoryModule
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
