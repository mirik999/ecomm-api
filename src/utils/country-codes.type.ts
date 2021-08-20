import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

@InputType('CountryCodesTypeReq')
export class CountryCodesTypeReq {
  @IsOptional()
  @Field({ nullable: true })
  AZ: string;
  @IsOptional()
  @Field({ nullable: true })
  RU: string;
  @IsOptional()
  @Field({ nullable: true })
  TR: string;
  @IsOptional()
  @Field({ nullable: true })
  EN: string;
  @IsOptional()
  @Field({ nullable: true })
  FR: string;
  @IsOptional()
  @Field({ nullable: true })
  SP: string;
  @IsOptional()
  @Field({ nullable: true })
  DE: string;
}

@ObjectType('CountryCodesTypeRes')
export class CountryCodesTypeRes {
  @Field({ nullable: true })
  AZ: string;
  @Field({ nullable: true })
  RU: string;
  @Field({ nullable: true })
  TR: string;
  @Field({ nullable: true })
  EN: string;
  @Field({ nullable: true })
  FR: string;
  @Field({ nullable: true })
  SP: string;
  @Field({ nullable: true })
  DE: string;
}

@Schema()
export class CountryCodes {
  @Prop()
  AZ: string;
  @Prop()
  RU: string;
  @Prop()
  TR: string;
  @Prop()
  EN: string;
  @Prop()
  FR: string;
  @Prop()
  SP: string;
  @Prop()
  DE: string;
}
export const CountryCodesTypeSchema =
  SchemaFactory.createForClass(CountryCodes);
