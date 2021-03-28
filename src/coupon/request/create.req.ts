import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray, IsDate, IsDateString,
  IsNotEmpty, IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @Field()
  endDate: string;
}
