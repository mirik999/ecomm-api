import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DefaultRes } from '../../../common/response/common.res';

@ObjectType('SubCategoryRes')
export class SubCategoryRes extends DefaultRes {
  @Field(() => ID, { nullable: true })
  parentId: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tabName: string;
}

@ObjectType('CategoryRes')
export class CategoryRes extends DefaultRes {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tabName: string;

  @Field(() => [SubCategoryRes], { nullable: true })
  subCategories?: SubCategoryRes[];
}

@ObjectType('CategoriesRes')
export class CategoriesRes {
  @Field()
  count: number;

  @Field(() => [CategoryRes])
  payload: CategoryRes[];
}
