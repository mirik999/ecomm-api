import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CpuResponse')
export class CpuResponse {
  @Field()
  cpuModel: string;
  cpuSpeed: number;
  cpuCores: number;
  cpuLoad: any;
}

@ObjectType('OsInfoResponse')
export class OsInfoResponse {
  @Field()
  type: string;
  upTime: number;
  freeMem: number;
  totalMem: number;
  memUsage: number;
}
