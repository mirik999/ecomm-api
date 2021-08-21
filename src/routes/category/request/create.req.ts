import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { DefaultReq } from '../../../common/request/common.req';

@InputType()
export class SubCategoryReq extends DefaultReq {
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
export class CreateCategoryReq extends DefaultReq {
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
