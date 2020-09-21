import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  picture: {
    data: {
      height: number;
      is_silhuete: boolean;
      url: string;
    };
  };

  @Column()
  phone: string;

  @Column()
  birthDate: string;

  @Column()
  city: string;

  @Column()
  skills: string;

  @Column()
  experience: string;

  @Column()
  education: string;

  @Column()
  additionalInfo: string;
}
