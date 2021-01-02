import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  id: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  tabName: string;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  createdAt: Date;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isDisabled: boolean;
}
