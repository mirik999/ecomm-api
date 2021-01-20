import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/electroshop'),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ProductModule,
    CategoryModule,
    UserModule,
    StatisticModule,
  ],
})
export class AppModule {}
