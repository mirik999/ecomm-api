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

@ObjectType('CategoryStatistic')
export class CategoryStatistic {
  @Field()
  count: number;
  @Field()
  isDisabled: number;
}

@ObjectType('BrandStatistic')
export class BrandStatistic {
  @Field()
  count: number;
  @Field()
  isDisabled: number;
}

@ObjectType('ProductStatistic')
export class ProductStatistic extends CategoryStatistic {
  @Field({ nullable: true })
  sale: number;
  @Field({ nullable: true })
  sold: number;
  @Field({ nullable: true })
  comment: number;
  // @Field({ nullable: true })
  // price: number;
}

@ObjectType('CommonStatistics')
export class CommonStatistics {
  @Field({ nullable: true })
  product: ProductStatistic;
  @Field(() => Int, { nullable: true })
  comments: number;
  @Field({ nullable: true })
  category: CategoryStatistic;
  @Field({ nullable: true })
  brand: BrandStatistic;
}
