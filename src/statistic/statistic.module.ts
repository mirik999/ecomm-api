import { Module } from '@nestjs/common';
import { StatisticGateway } from './statistic.gateway';

@Module({
  providers: [StatisticGateway],
})
export class StatisticModule {}
