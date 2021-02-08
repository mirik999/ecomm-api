import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class SubCategoryReq {
  @IsUUID()
  @Field()
  id: string;

  @IsUUID()
  @Field()
  parentId: string;

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
  @IsUUID()
  @Field()
  id: string;

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
