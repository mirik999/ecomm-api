import { Module } from '@nestjs/common';
import { StatisticGateway } from './statistic.gateway';
import { StatisticService } from './statistic.service';
import { StatisticResolver } from './statistic.resolver';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [ProductModule, CategoryModule, CommentModule, BrandModule],
  providers: [StatisticGateway, StatisticService, StatisticResolver],
})
export class StatisticModule {}
