import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  from: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  to: Date;
}
