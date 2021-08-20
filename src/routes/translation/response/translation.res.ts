import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CountryCodesTypeRes } from '../../../utils/country-codes.type';

@ObjectType('TranslationRes')
export class TranslationRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  keyword: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field(() => CountryCodesTypeRes, { nullable: true })
  translation: CountryCodesTypeRes;
}

@ObjectType('TranslationsRes')
export class TranslationsRes {
  @Field()
  count: number;

  @Field(() => [TranslationRes])
  payload: TranslationRes[];
}
