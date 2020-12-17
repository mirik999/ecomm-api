import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  tabName: string;
}
