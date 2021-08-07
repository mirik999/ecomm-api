import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CountryCodesTypeReq } from '../../../utils/country-codes.type';

@InputType()
export class CreateTranslationReq {
  @IsString()
  @IsNotEmpty()
  @Field()
  keyword: string;

  @Field(() => CountryCodesTypeReq)
  translation: CountryCodesTypeReq;
}
