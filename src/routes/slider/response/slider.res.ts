import { Field, ObjectType } from '@nestjs/graphql';
import { DefaultRes, ImageRes } from '../../../common/response/common.res';

@ObjectType('SliderRes')
export class SliderRes extends DefaultRes {
  @Field({ nullable: true })
  name: string;

  @Field(() => [ImageRes], { nullable: true })
  images: ImageRes[];

  @Field({ nullable: true })
  fade: boolean;

  @Field({ nullable: true })
  vertical: boolean;
}

@ObjectType('SlidersRes')
export class SlidersRes {
  @Field()
  count: number;

  @Field(() => [SliderRes])
  payload: SliderRes[];
}
