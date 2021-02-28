import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: async () => {
          const schema = ProductSchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique'
          });
          return schema;
        }
      }
    ]),
    CategoryModule,
    BrandModule
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
