import {
  serializeModel,
  transformDateToString,
  transformStringToDate,
  transformStringToObject,
  translate,
  User
} from '@rucken/core';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IModel } from 'ngx-repository';
import { Status } from './status';

export class Project implements IModel {
  static strings = {
    id: translate('Id'),
    title: translate('Title'),
    description: translate('Description'),
    isPublic: translate('Is public'),
    createdAt: translate('Created at'),
    updatedAt: translate('Updated at'),
    statuses: translate('Statuses'),
    tasks: translate('Tasks'),
    users: translate('Users'),
    completedTasksCount: translate('Completed tasks'),
    tasksCount: translate('Tasks'),

    createTitle: translate('Add new project'),
    viewTitle: translate('Project #{{id}}'),
    updateTitle: translate('Update project #{{id}}'),
    deleteTitle: translate('Delete project #{{id}}'),
    deleteMessage: translate('Do you really want to delete project?')
  };

  id: number = undefined;

  completedTasksCount: number = undefined;

  tasksCount: number = undefined;

  @IsNotEmpty()
  title: string = undefined;

  description: string = undefined;

  isPublic: boolean = undefined;

  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  createdAt: Date | string = undefined;

  @Transform(transformStringToDate, { toClassOnly: true })
  @Transform(transformDateToString, { toPlainOnly: true })
  updatedAt: Date | string = undefined;

  @IsOptional()
  @Type(serializeModel(Status))
  statuses: Status[] = [];

  @IsOptional()
  @Type(serializeModel(User))
  users: User[] = [];

  @Type(serializeModel(User))
  @Transform(transformStringToObject, { toPlainOnly: true })
  createdUser: User = undefined;

  @Type(serializeModel(User))
  @Transform(transformStringToObject, { toPlainOnly: true })
  updatedUser: User = undefined;

  get isPublicAsString() {
    if (this.isPublic) {
      return translate('Yes');
    } else {
      return translate('No');
    }
  }

  get usersAsString() {
    return this.users.join(', ');
  }

  get statusesAsString() {
    return this.statuses.join(', ');
  }

  toString() {
    return this.title;
  }
}
