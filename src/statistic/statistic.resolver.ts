import { Resolver, Subscription, Query } from '@nestjs/graphql';
import { StatisticService } from './statistic.service';
import { PubSub } from 'graphql-subscriptions';
import { CpuResponse, CpuResponseTest } from './response/cpu.res';

const pubSub = new PubSub();

@Resolver()
export class StatisticResolver {
  constructor(private statisticService: StatisticService) {}

  @Query(() => CpuResponseTest)
  trigger() {
    pubSub.publish('getCpuThreads', {
      threads: 6,
    });
    return {
      name: 'Hello',
    };
  }

  @Subscription(() => CpuResponse)
  getCpuThreads() {
    return pubSub.asyncIterator('getCpuThreads');
  }
}
