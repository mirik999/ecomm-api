import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CountryCodesTypeReq } from '../../../utils/country-codes.type';

@InputType()
export class UpdateTranslationReq {
  @IsUUID()
  @Field({ nullable: true })
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  keyword: string;

  @Field(() => CountryCodesTypeReq)
  translation: CountryCodesTypeReq;
}
