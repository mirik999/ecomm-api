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

  @PrimaryColumn()
  id: string;

  @Column()
  createdAt: string;

  @Column({ default: false })
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
  picture: string;

  @Column()
  skills: string;

  @Column()
  experience: string;

  @Column()
  additionalInfo: string;

  @Column()
  user: string;
}
