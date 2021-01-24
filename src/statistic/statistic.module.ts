import { Module } from '@nestjs/common';
import { StatisticGateway } from './statistic.gateway';
import { StatisticService } from './statistic.service';
import { StatisticResolver } from './statistic.resolver';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [ProductModule, CategoryModule],
  providers: [StatisticGateway, StatisticService, StatisticResolver],
})
export class StatisticModule {}
