import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DefaultReq } from '../../../common/request/common.req';

@InputType('UpdateCouponKeyReq')
export class UpdateCouponKeyReq {
  @IsBoolean()
  @Field()
  used: boolean;

  @IsString()
  @Field()
  key: string;
}

@InputType('UpdateCouponReq')
export class UpdateCouponReq extends DefaultReq {
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
  @Field(() => [UpdateCouponKeyReq], { nullable: true })
  couponList: UpdateCouponKeyReq[];

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
  endDate: Date;
}
