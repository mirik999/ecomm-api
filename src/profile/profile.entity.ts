import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {

  @BeforeInsert()
  nameToUpperCase() {
    this.email = this.email.toLowerCase()
  }

  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  social: boolean;

  @Column()
  socialId: string;

  @Column()
  picture: string;

  @Column()
  createdAt: string;

  @Column()
  isDisabled: boolean;

  @Column()
  birthDate: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column()
  skills: string;

  @Column()
  experience: string;

  @Column()
  additionalInfo: string;

  @Column()
  user: string;

  @Column()
  account: string;
}
