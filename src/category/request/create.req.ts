import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class SubCategoryReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  tabName: string;
}

@InputType()
export class CreateCategoryReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  tabName: string;

  @IsArray()
  @Field(() => [SubCategoryReq])
  subCategories: SubCategoryReq[];
}
