import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('leads')
@Unique(['email'])
@Unique(['cellphone'])
export class LeadEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  family_name: string;

  @Column()
  email: string;

  @Column()
  cellphone: string;
}
