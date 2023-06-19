import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['slug'])
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createDate: Date;
}
