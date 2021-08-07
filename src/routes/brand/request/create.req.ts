import { Field, ID, InputType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { DefaultReq, ImageReq } from '../../../common/request/common.req';

@InputType()
export class CreateBrandReq extends DefaultReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @Field(() => ImageReq)
  imageUrl: ImageReq;

  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @Field(() => [ID])
  category: string[];
}
