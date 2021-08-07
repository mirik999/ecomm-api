import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CpuResponse')
export class CpuResponse {
  @Field()
  cpuModel: string;
  @Field()
  cpuSpeed: number;
  @Field()
  cpuCores: number;
  @Field(() => Int!)
  cpuLoad: any;
}

@ObjectType('OsInfoResponse')
export class OsInfoResponse {
  @Field()
  type: string;
  @Field()
  upTime: number;
  @Field()
  freeMem: number;
  @Field()
  totalMem: number;
  @Field()
  memUsage: number;
}

@ObjectType('ProductStatistic')
export class ProductStatistic {
  @Field()
  count: number;
  @Field()
  sale: number;
  @Field()
  new: number;
  @Field()
  used: number;
  @Field()
  defective: number;
}

@ObjectType('ArticleStatistic')
export class ArticleStatistic {
  @Field()
  count: number;
}

@ObjectType('CommonStatistics')
export class CommonStatistics {
  @Field({ nullable: true })
  product: ProductStatistic;
  @Field(() => Int, { nullable: true })
  comments: number;
}
