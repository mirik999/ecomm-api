import { Module } from '@nestjs/common';
import { StatisticGateway } from './statistic.gateway';
import { StatisticService } from './statistic.service';

@Module({
  providers: [StatisticGateway, StatisticService],
})
export class StatisticModule {}
