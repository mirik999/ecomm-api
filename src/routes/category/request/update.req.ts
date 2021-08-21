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
export class UpdateSubCategoryReq extends DefaultReq {
  @IsUUID()
  @Field({ nullable: true })
  parentId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field({ nullable: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field({ nullable: true })
  tabName: string;
}

@InputType()
export class UpdateCategoryReq extends DefaultReq {
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
  @Field(() => [UpdateSubCategoryReq])
  subCategories: UpdateSubCategoryReq[];
}
