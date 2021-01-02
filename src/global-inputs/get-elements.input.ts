import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class GetElementsInput {
  @IsNumber()
  @Field()
  offset: number;

  @IsNumber()
  @Field()
  limit: number;

  @IsString()
  @Field()
  keyword: string;
}
