import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class UpdateProfileCredentials {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  email: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  fullName: string;

  @IsOptional()
  @IsBoolean()
  @Field({ defaultValue: false, nullable: true })
  social: boolean;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  socialId: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  picture: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isDisabled: boolean;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  createdAt: string;

  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Field({ nullable: true })
  birthDate: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  @Field({ nullable: true })
  city: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  @Field({ nullable: true })
  phone: string;

  @IsOptional()
  @MaxLength(10)
  @IsString()
  @Field({ nullable: true })
  gender: string;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  @Field({ nullable: true })
  skills: string;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  @Field({ nullable: true })
  experience: string;

  @IsOptional()
  @MaxLength(500)
  @IsString()
  @Field({ nullable: true })
  additionalInfo: string;
}
