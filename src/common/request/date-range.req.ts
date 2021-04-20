import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class DateRangeReq {
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  from: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  to: Date;
}
