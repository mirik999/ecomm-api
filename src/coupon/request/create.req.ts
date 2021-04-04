import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray, IsBoolean, IsDate,
  IsNotEmpty, IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

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
export class CreateCouponReq {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  id: string;

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
