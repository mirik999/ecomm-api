import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('CategorySelf')
export class CategorySelf {
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

@ObjectType('Category')
export class CategoryType {
  @Field()
  count: number;

  @Field(type => [CategorySelf])
  payload: CategorySelf[];
}
