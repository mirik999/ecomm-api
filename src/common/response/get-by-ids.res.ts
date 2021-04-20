import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ObjectType('GetByIdsRes')
export class GetByIdsRes {
  @IsArray()
  @Field(() => [String])
  ids: string[];
}
