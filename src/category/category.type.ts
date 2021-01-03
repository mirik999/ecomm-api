import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CategoryType')
export class CategoryType {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  tabName: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  isDisabled: boolean;
}

@ObjectType('CategoriesType')
export class CategoriesType {
  @Field()
  count: number;

  @Field(type => [CategoryType])
  payload: CategoryType[];
}
