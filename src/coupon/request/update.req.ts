import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean, IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType('UpdateCouponReq')
export class UpdateCouponReq {
  @IsUUID()
  @Field()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(24)
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  type: string[];

  @IsOptional()
  @IsArray()
  @Field(() => [String], { nullable: true })
  couponList: string[];

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Field({ nullable: true })
  value: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  used: number;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  endDate: Date;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  createdBy: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  modifiedBy: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isDisabled: boolean;
}
