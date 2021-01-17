import { Module } from '@nestjs/common';
import { StatisticResolver } from './statistic.resolver';
import { StatisticService } from './statistic.service';

@Module({
  providers: [StatisticResolver, StatisticService]
})
export class StatisticModule {}
