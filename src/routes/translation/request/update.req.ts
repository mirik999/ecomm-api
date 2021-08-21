import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CountryCodesTypeReq } from '../../../utils/country-codes.type';
import { DefaultReq } from '../../../common/request/common.req';

@InputType()
export class UpdateTranslationReq extends DefaultReq {
  @IsString()
  @IsNotEmpty()
  @Field()
  keyword: string;

  @Field(() => CountryCodesTypeReq)
  translation: CountryCodesTypeReq;
}
