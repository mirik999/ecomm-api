import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

@InputType('CountryCodesTypeReq')
export class CountryCodesTypeReq {
  @IsOptional()
  @Field({ nullable: true })
  AF: string;
  @IsOptional()
  @Field({ nullable: true })
  AX: string;
  @IsOptional()
  @Field({ nullable: true })
  AL: string;
  @IsOptional()
  @Field({ nullable: true })
  DZ: string;
  @IsOptional()
  @Field({ nullable: true })
  AS: string;
  @IsOptional()
  @Field({ nullable: true })
  AD: string;
  @IsOptional()
  @Field({ nullable: true })
  AO: string;
  @IsOptional()
  @Field({ nullable: true })
  AI: string;
  @IsOptional()
  @Field({ nullable: true })
  AQ: string;
  @IsOptional()
  @Field({ nullable: true })
  AG: string;
  @IsOptional()
  @Field({ nullable: true })
  AR: string;
  @IsOptional()
  @Field({ nullable: true })
  AM: string;
  @IsOptional()
  @Field({ nullable: true })
  AW: string;
  @IsOptional()
  @Field({ nullable: true })
  AU: string;
  @IsOptional()
  @Field({ nullable: true })
  AT: string;
  @IsOptional()
  @Field({ nullable: true })
  AZ: string;
  @IsOptional()
  @Field({ nullable: true })
  BS: string;
  @IsOptional()
  @Field({ nullable: true })
  BH: string;
  @IsOptional()
  @Field({ nullable: true })
  BD: string;
  @IsOptional()
  @Field({ nullable: true })
  BB: string;
  @IsOptional()
  @Field({ nullable: true })
  BY: string;
  @IsOptional()
  @Field({ nullable: true })
  BE: string;
  @IsOptional()
  @Field({ nullable: true })
  BZ: string;
  @IsOptional()
  @Field({ nullable: true })
  BJ: string;
  @IsOptional()
  @Field({ nullable: true })
  BM: string;
  @IsOptional()
  @Field({ nullable: true })
  BT: string;
  @IsOptional()
  @Field({ nullable: true })
  BO: string;
  @IsOptional()
  @Field({ nullable: true })
  BA: string;
  @IsOptional()
  @Field({ nullable: true })
  BW: string;
  @IsOptional()
  @Field({ nullable: true })
  BV: string;
  @IsOptional()
  @Field({ nullable: true })
  BR: string;
  @IsOptional()
  @Field({ nullable: true })
  IO: string;
  @IsOptional()
  @Field({ nullable: true })
  BN: string;
  @IsOptional()
  @Field({ nullable: true })
  BG: string;
  @IsOptional()
  @Field({ nullable: true })
  BF: string;
  @IsOptional()
  @Field({ nullable: true })
  BI: string;
  @IsOptional()
  @Field({ nullable: true })
  KH: string;
  @IsOptional()
  @Field({ nullable: true })
  CM: string;
  @IsOptional()
  @Field({ nullable: true })
  CA: string;
  @IsOptional()
  @Field({ nullable: true })
  CV: string;
  @IsOptional()
  @Field({ nullable: true })
  KY: string;
  @IsOptional()
  @Field({ nullable: true })
  CF: string;
  @IsOptional()
  @Field({ nullable: true })
  TD: string;
  @IsOptional()
  @Field({ nullable: true })
  CL: string;
  @IsOptional()
  @Field({ nullable: true })
  CN: string;
  @IsOptional()
  @Field({ nullable: true })
  CX: string;
  @IsOptional()
  @Field({ nullable: true })
  CC: string;
  @IsOptional()
  @Field({ nullable: true })
  CO: string;
  @IsOptional()
  @Field({ nullable: true })
  KM: string;
  @IsOptional()
  @Field({ nullable: true })
  CG: string;
  @IsOptional()
  @Field({ nullable: true })
  CD: string;
  @IsOptional()
  @Field({ nullable: true })
  CK: string;
  @IsOptional()
  @Field({ nullable: true })
  CR: string;
  @IsOptional()
  @Field({ nullable: true })
  CI: string;
  @IsOptional()
  @Field({ nullable: true })
  HR: string;
  @IsOptional()
  @Field({ nullable: true })
  CU: string;
  @IsOptional()
  @Field({ nullable: true })
  CY: string;
  @IsOptional()
  @Field({ nullable: true })
  CZ: string;
  @IsOptional()
  @Field({ nullable: true })
  DK: string;
  @IsOptional()
  @Field({ nullable: true })
  DJ: string;
  @IsOptional()
  @Field({ nullable: true })
  DM: string;
  @IsOptional()
  @Field({ nullable: true })
  DO: string;
  @IsOptional()
  @Field({ nullable: true })
  EC: string;
  @IsOptional()
  @Field({ nullable: true })
  EG: string;
  @IsOptional()
  @Field({ nullable: true })
  SV: string;
  @IsOptional()
  @Field({ nullable: true })
  GQ: string;
  @IsOptional()
  @Field({ nullable: true })
  ER: string;
  @IsOptional()
  @Field({ nullable: true })
  EE: string;
  @IsOptional()
  @Field({ nullable: true })
  ET: string;
  @IsOptional()
  @Field({ nullable: true })
  FK: string;
  @IsOptional()
  @Field({ nullable: true })
  FO: string;
  @IsOptional()
  @Field({ nullable: true })
  FJ: string;
  @IsOptional()
  @Field({ nullable: true })
  FI: string;
  @IsOptional()
  @Field({ nullable: true })
  FR: string;
  @IsOptional()
  @Field({ nullable: true })
  GF: string;
  @IsOptional()
  @Field({ nullable: true })
  PF: string;
  @IsOptional()
  @Field({ nullable: true })
  TF: string;
  @IsOptional()
  @Field({ nullable: true })
  GA: string;
  @IsOptional()
  @Field({ nullable: true })
  GM: string;
  @IsOptional()
  @Field({ nullable: true })
  GE: string;
  @IsOptional()
  @Field({ nullable: true })
  DE: string;
  @IsOptional()
  @Field({ nullable: true })
  GH: string;
  @IsOptional()
  @Field({ nullable: true })
  GI: string;
  @IsOptional()
  @Field({ nullable: true })
  GR: string;
  @IsOptional()
  @Field({ nullable: true })
  GL: string;
  @IsOptional()
  @Field({ nullable: true })
  GD: string;
  @IsOptional()
  @Field({ nullable: true })
  GP: string;
  @IsOptional()
  @Field({ nullable: true })
  GU: string;
  @IsOptional()
  @Field({ nullable: true })
  GT: string;
  @IsOptional()
  @Field({ nullable: true })
  GG: string;
  @IsOptional()
  @Field({ nullable: true })
  GN: string;
  @IsOptional()
  @Field({ nullable: true })
  GW: string;
  @IsOptional()
  @Field({ nullable: true })
  GY: string;
  @IsOptional()
  @Field({ nullable: true })
  HT: string;
  @IsOptional()
  @Field({ nullable: true })
  HM: string;
  @IsOptional()
  @Field({ nullable: true })
  VA: string;
  @IsOptional()
  @Field({ nullable: true })
  HN: string;
  @IsOptional()
  @Field({ nullable: true })
  HK: string;
  @IsOptional()
  @Field({ nullable: true })
  HU: string;
  @IsOptional()
  @Field({ nullable: true })
  IS: string;
  @IsOptional()
  @Field({ nullable: true })
  IN: string;
  @IsOptional()
  @Field({ nullable: true })
  ID: string;
  @IsOptional()
  @Field({ nullable: true })
  IR: string;
  @IsOptional()
  @Field({ nullable: true })
  IQ: string;
  @IsOptional()
  @Field({ nullable: true })
  IE: string;
  @IsOptional()
  @Field({ nullable: true })
  IM: string;
  @IsOptional()
  @Field({ nullable: true })
  IL: string;
  @IsOptional()
  @Field({ nullable: true })
  IT: string;
  @IsOptional()
  @Field({ nullable: true })
  JM: string;
  @IsOptional()
  @Field({ nullable: true })
  JP: string;
  @IsOptional()
  @Field({ nullable: true })
  JE: string;
  @IsOptional()
  @Field({ nullable: true })
  JO: string;
  @IsOptional()
  @Field({ nullable: true })
  KZ: string;
  @IsOptional()
  @Field({ nullable: true })
  KE: string;
  @IsOptional()
  @Field({ nullable: true })
  KI: string;
  @IsOptional()
  @Field({ nullable: true })
  KP: string;
  @IsOptional()
  @Field({ nullable: true })
  KR: string;
  @IsOptional()
  @Field({ nullable: true })
  KW: string;
  @IsOptional()
  @Field({ nullable: true })
  KG: string;
  @IsOptional()
  @Field({ nullable: true })
  LA: string;
  @IsOptional()
  @Field({ nullable: true })
  LV: string;
  @IsOptional()
  @Field({ nullable: true })
  LB: string;
  @IsOptional()
  @Field({ nullable: true })
  LS: string;
  @IsOptional()
  @Field({ nullable: true })
  LR: string;
  @IsOptional()
  @Field({ nullable: true })
  LY: string;
  @IsOptional()
  @Field({ nullable: true })
  LI: string;
  @IsOptional()
  @Field({ nullable: true })
  LT: string;
  @IsOptional()
  @Field({ nullable: true })
  LU: string;
  @IsOptional()
  @Field({ nullable: true })
  MO: string;
  @IsOptional()
  @Field({ nullable: true })
  MK: string;
  @IsOptional()
  @Field({ nullable: true })
  MG: string;
  @IsOptional()
  @Field({ nullable: true })
  MW: string;
  @IsOptional()
  @Field({ nullable: true })
  MY: string;
  @IsOptional()
  @Field({ nullable: true })
  MV: string;
  @IsOptional()
  @Field({ nullable: true })
  ML: string;
  @IsOptional()
  @Field({ nullable: true })
  MT: string;
  @IsOptional()
  @Field({ nullable: true })
  MH: string;
  @IsOptional()
  @Field({ nullable: true })
  MQ: string;
  @IsOptional()
  @Field({ nullable: true })
  MR: string;
  @IsOptional()
  @Field({ nullable: true })
  MU: string;
  @IsOptional()
  @Field({ nullable: true })
  YT: string;
  @IsOptional()
  @Field({ nullable: true })
  MX: string;
  @IsOptional()
  @Field({ nullable: true })
  FM: string;
  @IsOptional()
  @Field({ nullable: true })
  MD: string;
  @IsOptional()
  @Field({ nullable: true })
  MC: string;
  @IsOptional()
  @Field({ nullable: true })
  MN: string;
  @IsOptional()
  @Field({ nullable: true })
  MS: string;
  @IsOptional()
  @Field({ nullable: true })
  MA: string;
  @IsOptional()
  @Field({ nullable: true })
  MZ: string;
  @IsOptional()
  @Field({ nullable: true })
  MM: string;
  @IsOptional()
  @Field({ nullable: true })
  NA: string;
  @IsOptional()
  @Field({ nullable: true })
  NR: string;
  @IsOptional()
  @Field({ nullable: true })
  NP: string;
  @IsOptional()
  @Field({ nullable: true })
  NL: string;
  @IsOptional()
  @Field({ nullable: true })
  AN: string;
  @IsOptional()
  @Field({ nullable: true })
  NC: string;
  @IsOptional()
  @Field({ nullable: true })
  NZ: string;
  @IsOptional()
  @Field({ nullable: true })
  NI: string;
  @IsOptional()
  @Field({ nullable: true })
  NE: string;
  @IsOptional()
  @Field({ nullable: true })
  NG: string;
  @IsOptional()
  @Field({ nullable: true })
  NU: string;
  @IsOptional()
  @Field({ nullable: true })
  NF: string;
  @IsOptional()
  @Field({ nullable: true })
  MP: string;
  @IsOptional()
  @Field({ nullable: true })
  NO: string;
  @IsOptional()
  @Field({ nullable: true })
  OM: string;
  @IsOptional()
  @Field({ nullable: true })
  PK: string;
  @IsOptional()
  @Field({ nullable: true })
  PW: string;
  @IsOptional()
  @Field({ nullable: true })
  PS: string;
  @IsOptional()
  @Field({ nullable: true })
  PA: string;
  @IsOptional()
  @Field({ nullable: true })
  PG: string;
  @IsOptional()
  @Field({ nullable: true })
  PY: string;
  @IsOptional()
  @Field({ nullable: true })
  PE: string;
  @IsOptional()
  @Field({ nullable: true })
  PH: string;
  @IsOptional()
  @Field({ nullable: true })
  PN: string;
  @IsOptional()
  @Field({ nullable: true })
  PL: string;
  @IsOptional()
  @Field({ nullable: true })
  PT: string;
  @IsOptional()
  @Field({ nullable: true })
  PR: string;
  @IsOptional()
  @Field({ nullable: true })
  QA: string;
  @IsOptional()
  @Field({ nullable: true })
  RE: string;
  @IsOptional()
  @Field({ nullable: true })
  RO: string;
  @IsOptional()
  @Field({ nullable: true })
  RU: string;
  @IsOptional()
  @Field({ nullable: true })
  RW: string;
  @IsOptional()
  @Field({ nullable: true })
  SH: string;
  @IsOptional()
  @Field({ nullable: true })
  KN: string;
  @IsOptional()
  @Field({ nullable: true })
  LC: string;
  @IsOptional()
  @Field({ nullable: true })
  PM: string;
  @IsOptional()
  @Field({ nullable: true })
  VC: string;
  @IsOptional()
  @Field({ nullable: true })
  WS: string;
  @IsOptional()
  @Field({ nullable: true })
  SM: string;
  @IsOptional()
  @Field({ nullable: true })
  ST: string;
  @IsOptional()
  @Field({ nullable: true })
  SA: string;
  @IsOptional()
  @Field({ nullable: true })
  SN: string;
  @IsOptional()
  @Field({ nullable: true })
  CS: string;
  @IsOptional()
  @Field({ nullable: true })
  SC: string;
  @IsOptional()
  @Field({ nullable: true })
  SL: string;
  @IsOptional()
  @Field({ nullable: true })
  SG: string;
  @IsOptional()
  @Field({ nullable: true })
  SK: string;
  @IsOptional()
  @Field({ nullable: true })
  SI: string;
  @IsOptional()
  @Field({ nullable: true })
  SB: string;
  @IsOptional()
  @Field({ nullable: true })
  SO: string;
  @IsOptional()
  @Field({ nullable: true })
  ZA: string;
  @IsOptional()
  @Field({ nullable: true })
  GS: string;
  @IsOptional()
  @Field({ nullable: true })
  ES: string;
  @IsOptional()
  @Field({ nullable: true })
  LK: string;
  @IsOptional()
  @Field({ nullable: true })
  SD: string;
  @IsOptional()
  @Field({ nullable: true })
  SR: string;
  @IsOptional()
  @Field({ nullable: true })
  SJ: string;
  @IsOptional()
  @Field({ nullable: true })
  SZ: string;
  @IsOptional()
  @Field({ nullable: true })
  SE: string;
  @IsOptional()
  @Field({ nullable: true })
  CH: string;
  @IsOptional()
  @Field({ nullable: true })
  SY: string;
  @IsOptional()
  @Field({ nullable: true })
  TW: string;
  @IsOptional()
  @Field({ nullable: true })
  TJ: string;
  @IsOptional()
  @Field({ nullable: true })
  TZ: string;
  @IsOptional()
  @Field({ nullable: true })
  TH: string;
  @IsOptional()
  @Field({ nullable: true })
  TL: string;
  @IsOptional()
  @Field({ nullable: true })
  TG: string;
  @IsOptional()
  @Field({ nullable: true })
  TK: string;
  @IsOptional()
  @Field({ nullable: true })
  TO: string;
  @IsOptional()
  @Field({ nullable: true })
  TT: string;
  @IsOptional()
  @Field({ nullable: true })
  TN: string;
  @IsOptional()
  @Field({ nullable: true })
  TR: string;
  @IsOptional()
  @Field({ nullable: true })
  TM: string;
  @IsOptional()
  @Field({ nullable: true })
  TC: string;
  @IsOptional()
  @Field({ nullable: true })
  TV: string;
  @IsOptional()
  @Field({ nullable: true })
  UG: string;
  @IsOptional()
  @Field({ nullable: true })
  UA: string;
  @IsOptional()
  @Field({ nullable: true })
  AE: string;
  @IsOptional()
  @Field({ nullable: true })
  GB: string;
  @IsOptional()
  @Field({ nullable: true })
  US: string;
  @IsOptional()
  @Field({ nullable: true })
  UM: string;
  @IsOptional()
  @Field({ nullable: true })
  UY: string;
  @IsOptional()
  @Field({ nullable: true })
  UZ: string;
  @IsOptional()
  @Field({ nullable: true })
  VU: string;
  @IsOptional()
  @Field({ nullable: true })
  VE: string;
  @IsOptional()
  @Field({ nullable: true })
  VN: string;
  @IsOptional()
  @Field({ nullable: true })
  VG: string;
  @IsOptional()
  @Field({ nullable: true })
  VI: string;
  @IsOptional()
  @Field({ nullable: true })
  WF: string;
  @IsOptional()
  @Field({ nullable: true })
  EH: string;
  @IsOptional()
  @Field({ nullable: true })
  YE: string;
  @IsOptional()
  @Field({ nullable: true })
  ZM: string;
  @IsOptional()
  @Field({ nullable: true })
  ZW: string;
}

@ObjectType('CountryCodesTypeRes')
export class CountryCodesTypeRes {
  @Field({ nullable: true })
  AF: string;
  @Field({ nullable: true })
  AX: string;
  @Field({ nullable: true })
  AL: string;
  @Field({ nullable: true })
  DZ: string;
  @Field({ nullable: true })
  AS: string;
  @Field({ nullable: true })
  AD: string;
  @Field({ nullable: true })
  AO: string;
  @Field({ nullable: true })
  AI: string;
  @Field({ nullable: true })
  AQ: string;
  @Field({ nullable: true })
  AG: string;
  @Field({ nullable: true })
  AR: string;
  @Field({ nullable: true })
  AM: string;
  @Field({ nullable: true })
  AW: string;
  @Field({ nullable: true })
  AU: string;
  @Field({ nullable: true })
  AT: string;
  @Field({ nullable: true })
  AZ: string;
  @Field({ nullable: true })
  BS: string;
  @Field({ nullable: true })
  BH: string;
  @Field({ nullable: true })
  BD: string;
  @Field({ nullable: true })
  BB: string;
  @Field({ nullable: true })
  BY: string;
  @Field({ nullable: true })
  BE: string;
  @Field({ nullable: true })
  BZ: string;
  @Field({ nullable: true })
  BJ: string;
  @Field({ nullable: true })
  BM: string;
  @Field({ nullable: true })
  BT: string;
  @Field({ nullable: true })
  BO: string;
  @Field({ nullable: true })
  BA: string;
  @Field({ nullable: true })
  BW: string;
  @Field({ nullable: true })
  BV: string;
  @Field({ nullable: true })
  BR: string;
  @Field({ nullable: true })
  IO: string;
  @Field({ nullable: true })
  BN: string;
  @Field({ nullable: true })
  BG: string;
  @Field({ nullable: true })
  BF: string;
  @Field({ nullable: true })
  BI: string;
  @Field({ nullable: true })
  KH: string;
  @Field({ nullable: true })
  CM: string;
  @Field({ nullable: true })
  CA: string;
  @Field({ nullable: true })
  CV: string;
  @Field({ nullable: true })
  KY: string;
  @Field({ nullable: true })
  CF: string;
  @Field({ nullable: true })
  TD: string;
  @Field({ nullable: true })
  CL: string;
  @Field({ nullable: true })
  CN: string;
  @Field({ nullable: true })
  CX: string;
  @Field({ nullable: true })
  CC: string;
  @Field({ nullable: true })
  CO: string;
  @Field({ nullable: true })
  KM: string;
  @Field({ nullable: true })
  CG: string;
  @Field({ nullable: true })
  CD: string;
  @Field({ nullable: true })
  CK: string;
  @Field({ nullable: true })
  CR: string;
  @Field({ nullable: true })
  CI: string;
  @Field({ nullable: true })
  HR: string;
  @Field({ nullable: true })
  CU: string;
  @Field({ nullable: true })
  CY: string;
  @Field({ nullable: true })
  CZ: string;
  @Field({ nullable: true })
  DK: string;
  @Field({ nullable: true })
  DJ: string;
  @Field({ nullable: true })
  DM: string;
  @Field({ nullable: true })
  DO: string;
  @Field({ nullable: true })
  EC: string;
  @Field({ nullable: true })
  EG: string;
  @Field({ nullable: true })
  SV: string;
  @Field({ nullable: true })
  GQ: string;
  @Field({ nullable: true })
  ER: string;
  @Field({ nullable: true })
  EE: string;
  @Field({ nullable: true })
  ET: string;
  @Field({ nullable: true })
  FK: string;
  @Field({ nullable: true })
  FO: string;
  @Field({ nullable: true })
  FJ: string;
  @Field({ nullable: true })
  FI: string;
  @Field({ nullable: true })
  FR: string;
  @Field({ nullable: true })
  GF: string;
  @Field({ nullable: true })
  PF: string;
  @Field({ nullable: true })
  TF: string;
  @Field({ nullable: true })
  GA: string;
  @Field({ nullable: true })
  GM: string;
  @Field({ nullable: true })
  GE: string;
  @Field({ nullable: true })
  DE: string;
  @Field({ nullable: true })
  GH: string;
  @Field({ nullable: true })
  GI: string;
  @Field({ nullable: true })
  GR: string;
  @Field({ nullable: true })
  GL: string;
  @Field({ nullable: true })
  GD: string;
  @Field({ nullable: true })
  GP: string;
  @Field({ nullable: true })
  GU: string;
  @Field({ nullable: true })
  GT: string;
  @Field({ nullable: true })
  GG: string;
  @Field({ nullable: true })
  GN: string;
  @Field({ nullable: true })
  GW: string;
  @Field({ nullable: true })
  GY: string;
  @Field({ nullable: true })
  HT: string;
  @Field({ nullable: true })
  HM: string;
  @Field({ nullable: true })
  VA: string;
  @Field({ nullable: true })
  HN: string;
  @Field({ nullable: true })
  HK: string;
  @Field({ nullable: true })
  HU: string;
  @Field({ nullable: true })
  IS: string;
  @Field({ nullable: true })
  IN: string;
  @Field({ nullable: true })
  ID: string;
  @Field({ nullable: true })
  IR: string;
  @Field({ nullable: true })
  IQ: string;
  @Field({ nullable: true })
  IE: string;
  @Field({ nullable: true })
  IM: string;
  @Field({ nullable: true })
  IL: string;
  @Field({ nullable: true })
  IT: string;
  @Field({ nullable: true })
  JM: string;
  @Field({ nullable: true })
  JP: string;
  @Field({ nullable: true })
  JE: string;
  @Field({ nullable: true })
  JO: string;
  @Field({ nullable: true })
  KZ: string;
  @Field({ nullable: true })
  KE: string;
  @Field({ nullable: true })
  KI: string;
  @Field({ nullable: true })
  KP: string;
  @Field({ nullable: true })
  KR: string;
  @Field({ nullable: true })
  KW: string;
  @Field({ nullable: true })
  KG: string;
  @Field({ nullable: true })
  LA: string;
  @Field({ nullable: true })
  LV: string;
  @Field({ nullable: true })
  LB: string;
  @Field({ nullable: true })
  LS: string;
  @Field({ nullable: true })
  LR: string;
  @Field({ nullable: true })
  LY: string;
  @Field({ nullable: true })
  LI: string;
  @Field({ nullable: true })
  LT: string;
  @Field({ nullable: true })
  LU: string;
  @Field({ nullable: true })
  MO: string;
  @Field({ nullable: true })
  MK: string;
  @Field({ nullable: true })
  MG: string;
  @Field({ nullable: true })
  MW: string;
  @Field({ nullable: true })
  MY: string;
  @Field({ nullable: true })
  MV: string;
  @Field({ nullable: true })
  ML: string;
  @Field({ nullable: true })
  MT: string;
  @Field({ nullable: true })
  MH: string;
  @Field({ nullable: true })
  MQ: string;
  @Field({ nullable: true })
  MR: string;
  @Field({ nullable: true })
  MU: string;
  @Field({ nullable: true })
  YT: string;
  @Field({ nullable: true })
  MX: string;
  @Field({ nullable: true })
  FM: string;
  @Field({ nullable: true })
  MD: string;
  @Field({ nullable: true })
  MC: string;
  @Field({ nullable: true })
  MN: string;
  @Field({ nullable: true })
  MS: string;
  @Field({ nullable: true })
  MA: string;
  @Field({ nullable: true })
  MZ: string;
  @Field({ nullable: true })
  MM: string;
  @Field({ nullable: true })
  NA: string;
  @Field({ nullable: true })
  NR: string;
  @Field({ nullable: true })
  NP: string;
  @Field({ nullable: true })
  NL: string;
  @Field({ nullable: true })
  AN: string;
  @Field({ nullable: true })
  NC: string;
  @Field({ nullable: true })
  NZ: string;
  @Field({ nullable: true })
  NI: string;
  @Field({ nullable: true })
  NE: string;
  @Field({ nullable: true })
  NG: string;
  @Field({ nullable: true })
  NU: string;
  @Field({ nullable: true })
  NF: string;
  @Field({ nullable: true })
  MP: string;
  @Field({ nullable: true })
  NO: string;
  @Field({ nullable: true })
  OM: string;
  @Field({ nullable: true })
  PK: string;
  @Field({ nullable: true })
  PW: string;
  @Field({ nullable: true })
  PS: string;
  @Field({ nullable: true })
  PA: string;
  @Field({ nullable: true })
  PG: string;
  @Field({ nullable: true })
  PY: string;
  @Field({ nullable: true })
  PE: string;
  @Field({ nullable: true })
  PH: string;
  @Field({ nullable: true })
  PN: string;
  @Field({ nullable: true })
  PL: string;
  @Field({ nullable: true })
  PT: string;
  @Field({ nullable: true })
  PR: string;
  @Field({ nullable: true })
  QA: string;
  @Field({ nullable: true })
  RE: string;
  @Field({ nullable: true })
  RO: string;
  @Field({ nullable: true })
  RU: string;
  @Field({ nullable: true })
  RW: string;
  @Field({ nullable: true })
  SH: string;
  @Field({ nullable: true })
  KN: string;
  @Field({ nullable: true })
  LC: string;
  @Field({ nullable: true })
  PM: string;
  @Field({ nullable: true })
  VC: string;
  @Field({ nullable: true })
  WS: string;
  @Field({ nullable: true })
  SM: string;
  @Field({ nullable: true })
  ST: string;
  @Field({ nullable: true })
  SA: string;
  @Field({ nullable: true })
  SN: string;
  @Field({ nullable: true })
  CS: string;
  @Field({ nullable: true })
  SC: string;
  @Field({ nullable: true })
  SL: string;
  @Field({ nullable: true })
  SG: string;
  @Field({ nullable: true })
  SK: string;
  @Field({ nullable: true })
  SI: string;
  @Field({ nullable: true })
  SB: string;
  @Field({ nullable: true })
  SO: string;
  @Field({ nullable: true })
  ZA: string;
  @Field({ nullable: true })
  GS: string;
  @Field({ nullable: true })
  ES: string;
  @Field({ nullable: true })
  LK: string;
  @Field({ nullable: true })
  SD: string;
  @Field({ nullable: true })
  SR: string;
  @Field({ nullable: true })
  SJ: string;
  @Field({ nullable: true })
  SZ: string;
  @Field({ nullable: true })
  SE: string;
  @Field({ nullable: true })
  CH: string;
  @Field({ nullable: true })
  SY: string;
  @Field({ nullable: true })
  TW: string;
  @Field({ nullable: true })
  TJ: string;
  @Field({ nullable: true })
  TZ: string;
  @Field({ nullable: true })
  TH: string;
  @Field({ nullable: true })
  TL: string;
  @Field({ nullable: true })
  TG: string;
  @Field({ nullable: true })
  TK: string;
  @Field({ nullable: true })
  TO: string;
  @Field({ nullable: true })
  TT: string;
  @Field({ nullable: true })
  TN: string;
  @Field({ nullable: true })
  TR: string;
  @Field({ nullable: true })
  TM: string;
  @Field({ nullable: true })
  TC: string;
  @Field({ nullable: true })
  TV: string;
  @Field({ nullable: true })
  UG: string;
  @Field({ nullable: true })
  UA: string;
  @Field({ nullable: true })
  AE: string;
  @Field({ nullable: true })
  GB: string;
  @Field({ nullable: true })
  US: string;
  @Field({ nullable: true })
  UM: string;
  @Field({ nullable: true })
  UY: string;
  @Field({ nullable: true })
  UZ: string;
  @Field({ nullable: true })
  VU: string;
  @Field({ nullable: true })
  VE: string;
  @Field({ nullable: true })
  VN: string;
  @Field({ nullable: true })
  VG: string;
  @Field({ nullable: true })
  VI: string;
  @Field({ nullable: true })
  WF: string;
  @Field({ nullable: true })
  EH: string;
  @Field({ nullable: true })
  YE: string;
  @Field({ nullable: true })
  ZM: string;
  @Field({ nullable: true })
  ZW: string;
}

@Schema()
export class CountryCodes {
  @Prop()
  AF: string;
  @Prop()
  AX: string;
  @Prop()
  AL: string;
  @Prop()
  DZ: string;
  @Prop()
  AS: string;
  @Prop()
  AD: string;
  @Prop()
  AO: string;
  @Prop()
  AI: string;
  @Prop()
  AQ: string;
  @Prop()
  AG: string;
  @Prop()
  AR: string;
  @Prop()
  AM: string;
  @Prop()
  AW: string;
  @Prop()
  AU: string;
  @Prop()
  AT: string;
  @Prop()
  AZ: string;
  @Prop()
  BS: string;
  @Prop()
  BH: string;
  @Prop()
  BD: string;
  @Prop()
  BB: string;
  @Prop()
  BY: string;
  @Prop()
  BE: string;
  @Prop()
  BZ: string;
  @Prop()
  BJ: string;
  @Prop()
  BM: string;
  @Prop()
  BT: string;
  @Prop()
  BO: string;
  @Prop()
  BA: string;
  @Prop()
  BW: string;
  @Prop()
  BV: string;
  @Prop()
  BR: string;
  @Prop()
  IO: string;
  @Prop()
  BN: string;
  @Prop()
  BG: string;
  @Prop()
  BF: string;
  @Prop()
  BI: string;
  @Prop()
  KH: string;
  @Prop()
  CM: string;
  @Prop()
  CA: string;
  @Prop()
  CV: string;
  @Prop()
  KY: string;
  @Prop()
  CF: string;
  @Prop()
  TD: string;
  @Prop()
  CL: string;
  @Prop()
  CN: string;
  @Prop()
  CX: string;
  @Prop()
  CC: string;
  @Prop()
  CO: string;
  @Prop()
  KM: string;
  @Prop()
  CG: string;
  @Prop()
  CD: string;
  @Prop()
  CK: string;
  @Prop()
  CR: string;
  @Prop()
  CI: string;
  @Prop()
  HR: string;
  @Prop()
  CU: string;
  @Prop()
  CY: string;
  @Prop()
  CZ: string;
  @Prop()
  DK: string;
  @Prop()
  DJ: string;
  @Prop()
  DM: string;
  @Prop()
  DO: string;
  @Prop()
  EC: string;
  @Prop()
  EG: string;
  @Prop()
  SV: string;
  @Prop()
  GQ: string;
  @Prop()
  ER: string;
  @Prop()
  EE: string;
  @Prop()
  ET: string;
  @Prop()
  FK: string;
  @Prop()
  FO: string;
  @Prop()
  FJ: string;
  @Prop()
  FI: string;
  @Prop()
  FR: string;
  @Prop()
  GF: string;
  @Prop()
  PF: string;
  @Prop()
  TF: string;
  @Prop()
  GA: string;
  @Prop()
  GM: string;
  @Prop()
  GE: string;
  @Prop()
  DE: string;
  @Prop()
  GH: string;
  @Prop()
  GI: string;
  @Prop()
  GR: string;
  @Prop()
  GL: string;
  @Prop()
  GD: string;
  @Prop()
  GP: string;
  @Prop()
  GU: string;
  @Prop()
  GT: string;
  @Prop()
  GG: string;
  @Prop()
  GN: string;
  @Prop()
  GW: string;
  @Prop()
  GY: string;
  @Prop()
  HT: string;
  @Prop()
  HM: string;
  @Prop()
  VA: string;
  @Prop()
  HN: string;
  @Prop()
  HK: string;
  @Prop()
  HU: string;
  @Prop()
  IS: string;
  @Prop()
  IN: string;
  @Prop()
  ID: string;
  @Prop()
  IR: string;
  @Prop()
  IQ: string;
  @Prop()
  IE: string;
  @Prop()
  IM: string;
  @Prop()
  IL: string;
  @Prop()
  IT: string;
  @Prop()
  JM: string;
  @Prop()
  JP: string;
  @Prop()
  JE: string;
  @Prop()
  JO: string;
  @Prop()
  KZ: string;
  @Prop()
  KE: string;
  @Prop()
  KI: string;
  @Prop()
  KP: string;
  @Prop()
  KR: string;
  @Prop()
  KW: string;
  @Prop()
  KG: string;
  @Prop()
  LA: string;
  @Prop()
  LV: string;
  @Prop()
  LB: string;
  @Prop()
  LS: string;
  @Prop()
  LR: string;
  @Prop()
  LY: string;
  @Prop()
  LI: string;
  @Prop()
  LT: string;
  @Prop()
  LU: string;
  @Prop()
  MO: string;
  @Prop()
  MK: string;
  @Prop()
  MG: string;
  @Prop()
  MW: string;
  @Prop()
  MY: string;
  @Prop()
  MV: string;
  @Prop()
  ML: string;
  @Prop()
  MT: string;
  @Prop()
  MH: string;
  @Prop()
  MQ: string;
  @Prop()
  MR: string;
  @Prop()
  MU: string;
  @Prop()
  YT: string;
  @Prop()
  MX: string;
  @Prop()
  FM: string;
  @Prop()
  MD: string;
  @Prop()
  MC: string;
  @Prop()
  MN: string;
  @Prop()
  MS: string;
  @Prop()
  MA: string;
  @Prop()
  MZ: string;
  @Prop()
  MM: string;
  @Prop()
  NA: string;
  @Prop()
  NR: string;
  @Prop()
  NP: string;
  @Prop()
  NL: string;
  @Prop()
  AN: string;
  @Prop()
  NC: string;
  @Prop()
  NZ: string;
  @Prop()
  NI: string;
  @Prop()
  NE: string;
  @Prop()
  NG: string;
  @Prop()
  NU: string;
  @Prop()
  NF: string;
  @Prop()
  MP: string;
  @Prop()
  NO: string;
  @Prop()
  OM: string;
  @Prop()
  PK: string;
  @Prop()
  PW: string;
  @Prop()
  PS: string;
  @Prop()
  PA: string;
  @Prop()
  PG: string;
  @Prop()
  PY: string;
  @Prop()
  PE: string;
  @Prop()
  PH: string;
  @Prop()
  PN: string;
  @Prop()
  PL: string;
  @Prop()
  PT: string;
  @Prop()
  PR: string;
  @Prop()
  QA: string;
  @Prop()
  RE: string;
  @Prop()
  RO: string;
  @Prop()
  RU: string;
  @Prop()
  RW: string;
  @Prop()
  SH: string;
  @Prop()
  KN: string;
  @Prop()
  LC: string;
  @Prop()
  PM: string;
  @Prop()
  VC: string;
  @Prop()
  WS: string;
  @Prop()
  SM: string;
  @Prop()
  ST: string;
  @Prop()
  SA: string;
  @Prop()
  SN: string;
  @Prop()
  CS: string;
  @Prop()
  SC: string;
  @Prop()
  SL: string;
  @Prop()
  SG: string;
  @Prop()
  SK: string;
  @Prop()
  SI: string;
  @Prop()
  SB: string;
  @Prop()
  SO: string;
  @Prop()
  ZA: string;
  @Prop()
  GS: string;
  @Prop()
  ES: string;
  @Prop()
  LK: string;
  @Prop()
  SD: string;
  @Prop()
  SR: string;
  @Prop()
  SJ: string;
  @Prop()
  SZ: string;
  @Prop()
  SE: string;
  @Prop()
  CH: string;
  @Prop()
  SY: string;
  @Prop()
  TW: string;
  @Prop()
  TJ: string;
  @Prop()
  TZ: string;
  @Prop()
  TH: string;
  @Prop()
  TL: string;
  @Prop()
  TG: string;
  @Prop()
  TK: string;
  @Prop()
  TO: string;
  @Prop()
  TT: string;
  @Prop()
  TN: string;
  @Prop()
  TR: string;
  @Prop()
  TM: string;
  @Prop()
  TC: string;
  @Prop()
  TV: string;
  @Prop()
  UG: string;
  @Prop()
  UA: string;
  @Prop()
  AE: string;
  @Prop()
  GB: string;
  @Prop()
  US: string;
  @Prop()
  UM: string;
  @Prop()
  UY: string;
  @Prop()
  UZ: string;
  @Prop()
  VU: string;
  @Prop()
  VE: string;
  @Prop()
  VN: string;
  @Prop()
  VG: string;
  @Prop()
  VI: string;
  @Prop()
  WF: string;
  @Prop()
  EH: string;
  @Prop()
  YE: string;
  @Prop()
  ZM: string;
  @Prop()
  ZW: string;
}
export const CountryCodesTypeSchema =
  SchemaFactory.createForClass(CountryCodes);
