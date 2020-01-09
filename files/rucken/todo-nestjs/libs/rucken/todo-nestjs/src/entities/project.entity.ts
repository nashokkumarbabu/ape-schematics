import { CustomValidationError, User } from '@rucken/core-nestjs';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, validateSync } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Status } from './status.entity';
import { Task } from './task.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number = undefined;

  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  title: string = undefined;

  @Column({ length: 512, nullable: true })
  @MaxLength(512)
  @IsOptional()
  description: string = undefined;

  @Column({ name: 'is_public', default: false })
  isPublic: boolean = undefined;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date = undefined;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date = undefined;

  @OneToMany(type => Status, status => status.project)
  statuses: Status[];

  @OneToMany(type => Task, task => task.project)
  tasks: Task[];

  @ManyToMany(type => User, {
    cascade: true
  })
  @JoinTable({
    name: 'user_projects',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  users: User[];

  @Type(() => User)
  @ManyToOne(type => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'created_user_id' })
  createdUser: User = undefined;

  @Type(() => User)
  @ManyToOne(type => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'updated_user_id' })
  updatedUser: User = undefined;

  tasksCount: number;

  completedTasksCount: number;

  @BeforeInsert()
  doBeforeInsertion() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }
}
