import { Field, ObjectType } from '@nestjs/graphql';
import { ImageRes, SeoRes } from '../../../common/response/common.res';

@ObjectType('ArticleRes')
export class ArticleRes extends SeoRes {
  @Field({ nullable: true })
  cover: ImageRes;

  @Field(() => [ImageRes], { nullable: true })
  images: ImageRes[];

  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  slug: string;
}

@ObjectType('ArticlesRes')
export class ArticlesRes {
  @Field()
  count: number;

  @Field(() => [ArticleRes])
  payload: ArticleRes[];
}
