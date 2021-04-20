import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateBrandReq {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @IsString()
  @Field()
  imageUrl: string;

  //ref to categories
  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  category: string[];
}
