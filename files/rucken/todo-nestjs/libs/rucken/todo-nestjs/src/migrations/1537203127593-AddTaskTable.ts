import { ContentType1524199022084, Group1524199022084, Permission1524199022084 } from '@rucken/core-nestjs';
import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTaskTable1537203127593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // create table
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'title',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar(512)',
            isNullable: true
          },
          {
            name: 'open_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: true
          },
          {
            name: 'close_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: true
          },
          {
            name: 'created_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            isNullable: false,
            default: queryRunner.connection.driver.mappedDataTypes.createDateDefault
          },
          {
            name: 'updated_at',
            type: queryRunner.connection.driver.mappedDataTypes.createDate.toString(),
            default: queryRunner.connection.driver.mappedDataTypes.updateDateDefault
          },
          {
            name: 'project_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'status_id',
            type: 'integer',
            isNullable: false
          }
        ]
      }),
      true
    );

    // create/load content type
    const ctNewEntity = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .save(plainToClass(ContentType1524199022084, { name: 'task', title: 'Task' }));
    const ctUser = await queryRunner.manager
      .getRepository<ContentType1524199022084>(ContentType1524199022084)
      .findOneOrFail({
        where: {
          name: 'user'
        }
      });

    // create permissions
    const readPermissions = await queryRunner.manager
      .getRepository<Permission1524199022084>(Permission1524199022084)
      .save(
        plainToClass(Permission1524199022084, [
          {
            title: 'Can read task',
            name: 'read_task',
            contentType: ctNewEntity
          },
          {
            title: 'Can read tasks frame',
            name: 'read_tasks-frame',
            contentType: ctUser
          },
          {
            title: 'Can read tasks page',
            name: 'read_tasks-page',
            contentType: ctUser
          }
        ])
      );
    const modifiPermissions = await queryRunner.manager
      .getRepository<Permission1524199022084>(Permission1524199022084)
      .save(
        plainToClass(Permission1524199022084, [
          {
            title: 'Can add task',
            name: 'add_task',
            contentType: ctNewEntity
          },
          {
            title: 'Can change task',
            name: 'change_task',
            contentType: ctNewEntity
          },
          {
            title: 'Can delete task',
            name: 'delete_task',
            contentType: ctNewEntity
          }
        ])
      );

    // add permissions to groups
    const gUser = await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).findOneOrFail({
      where: {
        name: 'user'
      },
      relations: ['permissions']
    });
    const gAdmin = await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).findOneOrFail({
      where: {
        name: 'admin'
      },
      relations: ['permissions']
    });
    gUser.permissions = [...gUser.permissions, ...readPermissions, ...modifiPermissions];
    gAdmin.permissions = [...gAdmin.permissions, ...readPermissions, ...modifiPermissions];
    await queryRunner.manager.getRepository<Group1524199022084>(Group1524199022084).save([gUser, gAdmin]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
