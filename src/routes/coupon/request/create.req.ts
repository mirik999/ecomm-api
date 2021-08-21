import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DefaultReq } from '../../../common/request/common.req';

@InputType('CouponKeyReq')
export class CouponKeyReq {
  @IsBoolean()
  @Field()
  used: boolean;

  @IsString()
  @Field()
  key: string;
}

@InputType('CreateCouponReq')
export class CreateCouponReq extends DefaultReq {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(24)
  @Field()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  value: number;

  @IsArray()
  @Field(() => [String])
  type: string[];

  @IsArray()
  @Field(() => [CouponKeyReq])
  couponList: CouponKeyReq[];

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsDate()
  @Field()
  endDate: Date;
}
