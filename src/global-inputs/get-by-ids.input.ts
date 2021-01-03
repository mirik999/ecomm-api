import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class GetByIdsInput {
  @IsArray()
  @Field(() => [String])
  ids: string[];
}

@ObjectType('GetByIdsOutput')
export class GetByIdsOutput {
  @IsArray()
  @Field(() => [String])
  ids: string[];
}
