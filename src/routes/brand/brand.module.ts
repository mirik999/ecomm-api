import { Module } from '@nestjs/common';
import { BrandResolver } from './brand.resolver';
import { BrandService } from './brand.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './brand.schema';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Brand.name,
        useFactory: async () => {
          const schema = BrandSchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique'
          });
          return schema;
        }
      }
    ]),
    CategoryModule
  ],
  providers: [BrandResolver, BrandService],
  exports: [BrandService]
})
export class BrandModule {}
