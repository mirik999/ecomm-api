import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class GetByIdsReq {
  @IsArray()
  @Field(() => [String])
  ids: string[];
}

