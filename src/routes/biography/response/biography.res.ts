import { Field, ObjectType } from '@nestjs/graphql';
import { ImageRes, SeoRes } from '../../../common/response/common.res';

@ObjectType('BiographyRes')
export class BiographyRes extends SeoRes {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => [ImageRes], { nullable: true })
  images: ImageRes[];
}

@ObjectType('BiographiesRes')
export class BiographiesRes {
  @Field()
  count: number;

  @Field(() => [BiographyRes])
  payload: BiographyRes[];
}
