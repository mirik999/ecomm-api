import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { DefaultReq, ImageReq } from '../../../common/request/common.req';

@InputType()
export class UpdateBrandReq extends DefaultReq {
  @IsString()
  @IsNotEmpty()
  @MaxLength(26)
  @Field()
  name: string;

  @IsOptional()
  @Field(() => ImageReq, { nullable: true })
  imageUrl: ImageReq;

  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID], { nullable: true })
  category: string[];
}
