import { Field, ObjectType } from '@nestjs/graphql';
import { ImageRes, SeoRes } from '../../../common/response/common.res';

@ObjectType('GalleryRes')
export class GalleryRes extends SeoRes {
  @Field({ nullable: true })
  name: string;

  @Field(() => [ImageRes], { nullable: true })
  images: ImageRes[];
}

@ObjectType('GalleriesRes')
export class GalleriesRes {
  @Field()
  count: number;

  @Field(() => [GalleryRes])
  payload: GalleryRes[];
}
