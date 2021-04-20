import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class UpdateBrandReq {
  @IsUUID()
  @Field({ nullable: true })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  imageUrl: string;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  createdAt: Date;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isDisabled: boolean;

  //ref to categories
  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID], { nullable: true })
  category: string[];
}
