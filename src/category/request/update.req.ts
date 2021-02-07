import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SubCategoryReq } from './create.req';

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

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field(() => [SubCategoryReq])
  subCategories: SubCategoryReq[];
}
