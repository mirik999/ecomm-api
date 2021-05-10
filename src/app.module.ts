import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './routes/product/product.module';
import { CategoryModule } from './routes/category/category.module';
import { UserModule } from './routes/user/user.module';
import { StatisticModule } from './routes/statistic/statistic.module';
import { CommentModule } from './routes/comment/comment.module';
import { AuthModule } from './routes/auth/auth.module';
import { BrandModule } from './routes/brand/brand.module';
import { CouponModule } from './routes/coupon/coupon.module';
import { SliderModule } from './routes/slider/slider.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost/electroshop',
      {
        useCreateIndex: true,
      }
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ScheduleModule.forRoot(),
    ProductModule,
    CategoryModule,
    UserModule,
    StatisticModule,
    CommentModule,
    AuthModule,
    BrandModule,
    CouponModule,
    SliderModule,
  ],
  providers: [],
})
export class AppModule {}
