import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString, IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateSubCategoryReq {
  @IsUUID()
  @Field({ nullable: true })
  id: string;

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
export class UpdateCategoryReq {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
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

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  createdAt: Date;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isDisabled: boolean;

  @IsArray()
  @Field(() => [UpdateSubCategoryReq])
  subCategories: UpdateSubCategoryReq[];
}
