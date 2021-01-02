import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class GetByIdsInput {
  @IsArray()
  @Field(() => [String])
  ids: string[];
}
