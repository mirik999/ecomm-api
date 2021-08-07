import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryRes } from '../../category/response/category.res';
import { DefaultRes, ImageRes } from '../../../common/response/common.res';

@ObjectType('BrandRes')
export class BrandRes extends DefaultRes {
  @Field({ nullable: true })
  name: string;

  @Field(() => ImageRes, { nullable: true })
  imageUrl: ImageRes;

  @Field(() => [CategoryRes], { nullable: true })
  category: string[];
}

@ObjectType('BrandsRes')
export class BrandsRes {
  @Field()
  count: number;

  @Field(() => [BrandRes])
  payload: BrandRes[];
}
