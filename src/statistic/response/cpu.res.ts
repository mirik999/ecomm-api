import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CpuResponse')
export class CpuResponse {
  @Field()
  threads: number;
}

@ObjectType('CpuResponseTest')
export class CpuResponseTest {
  @Field()
  name: string;
}
