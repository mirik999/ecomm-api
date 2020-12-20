import { Field, InputType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import {
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
