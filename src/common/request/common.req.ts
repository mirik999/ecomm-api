import { Field, InputType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType('ImageReq')
export class ImageReq {
  @IsString()
  @Field()
  src: string;

  @IsString()
  @Field()
  alt: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  videoId: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  link: string;
}

@InputType('DefaultReq ')
export class DefaultReq {
  @IsOptional()
  @IsUUID()
  @Field({ defaultValue: uuid() })
  id: string;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true, defaultValue: new Date() })
  createdAt: Date;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  createdBy: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true, defaultValue: '' })
  modifiedBy: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, defaultValue: false })
  isDisabled: boolean;
}

@InputType('SeoReq')
export class SeoReq extends DefaultReq {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  @Field({ nullable: true, defaultValue: '' })
  keywords: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field({ nullable: true, defaultValue: '' })
  htmlTitle: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Field({ nullable: true, defaultValue: '' })
  description: string;
}
