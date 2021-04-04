import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryRes } from '../../category/response/category.res';

@ObjectType('BrandRes')
export class BrandRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  isDisabled: boolean;

  @Field(() => [CategoryRes], { nullable: true })
  category: string[]
}

@ObjectType('BrandsRes')
export class BrandsRes {
  @Field()
  count: number;

  @Field(() => [BrandRes])
  payload: BrandRes[];
}

