import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SubCategoryRes')
export class SubCategoryRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => ID, { nullable: true })
  parentId: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tabName: string;
}

@ObjectType('CategoryRes')
export class CategoryRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tabName: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  isDisabled: boolean;

  @Field(() => [SubCategoryRes])
  subCategories: SubCategoryRes[]
}

@ObjectType('CategoriesRes')
export class CategoriesRes {
  @Field()
  count: number;

  @Field(() => [CategoryRes])
  payload: CategoryRes[];
}
