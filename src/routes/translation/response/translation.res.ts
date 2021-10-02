import { Field, ObjectType } from '@nestjs/graphql';
import { CountryCodesTypeRes } from '../../../utils/country-codes.type';
import { DefaultRes } from '../../../common/response/common.res';

@ObjectType('TranslationRes')
export class TranslationRes extends DefaultRes {
  @Field({ nullable: true })
  keyword: string;

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

//The simple version just for UI
@ObjectType('TranslationForUIRes')
export class TranslationForUIRes extends DefaultRes {
  @Field({ nullable: true })
  keyword: string;

  @Field({ nullable: true })
  translation: string;
}
