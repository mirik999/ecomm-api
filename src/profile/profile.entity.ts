import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  @PrimaryColumn()
  id: string;

  @Column()
  birthDate: string;

  @Column()
  city: string;

  @Column()
  phone: number;

  @Column()
  gender: string;

  @Column()
  picture: string;

  @Column()
  skills: string;

  @Column()
  experriance: string;

  @Column()
  additionalInfo: string;
}
