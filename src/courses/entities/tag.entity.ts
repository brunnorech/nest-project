/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from './course.entity'
import { v4 } from 'uuid';

@Entity('tags')
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => Course, (course: Course) => course.tags)
  courses: Course[]

  @CreateDateColumn({ type: 'timestamp'})
  created_at: Date;
}
