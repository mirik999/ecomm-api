import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('SliderRes')
export class SliderRes {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field({ nullable: true })
  fade: boolean;

  @Field({ nullable: true })
  vertical: boolean;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  isDisabled: boolean;
}

@ObjectType('SlidersRes')
export class SlidersRes {
  @Field()
  count: number;

  @Field(() => [SliderRes])
  payload: SliderRes[];
}
