import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class UpdateSettingReq {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  id: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Field({ nullable: true })
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  @Field({ nullable: true })
  keywords: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Field({ nullable: true })
  title: string;
}
