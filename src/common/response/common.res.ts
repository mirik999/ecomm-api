import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('ImageRes')
export class ImageRes {
  @Field()
  src: string;

  @Field()
  alt: string;

  @Field({ nullable: true })
  videoId: string;

  @Field({ nullable: true })
  link: string;
}

@ObjectType('DefaultRes')
export class DefaultRes {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  createdBy: string;

  @Field({ nullable: true })
  modifiedBy: string;

  @Field({ nullable: true })
  isDisabled: boolean;
}

@ObjectType('SeoRes')
export class SeoRes extends DefaultRes {
  @Field({ nullable: true})
  keywords: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  htmlTitle: string;
}
