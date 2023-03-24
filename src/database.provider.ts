/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { CreateCoursesTable1678486108590 } from './migrations/1678486108590-CreateCoursesTable';
import { CreateTagsTable1678486383665 } from './migrations/1678486383665-CreateTagsTable';
import { CreateCoursesTagsTable1678488840695 } from './migrations/1678488840695-CreateCoursesTagsTable';
import { AddCoursesIdToeCoursesTagsTable1678489138400 } from './migrations/1678489138400-AddCoursesIdToeCoursesTagsTable';
import { AddTagsIdToeCoursesTagsTable1678489498059 } from './migrations/1678489498059-AddTagsIdToeCoursesTagsTable';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'db',
                port: 5432,
                username: 'postgres',
                password: 'docker',
                database: 'postgres',
                synchronize: false,
                entities: [`${__dirname}/../**/*.entity.js`],
            });

            return dataSource.initialize();
        },
    },
];

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    synchronize: false,
    entities: [`${__dirname}/../**/*.entity.js`],
    migrations: [CreateCoursesTable1678486108590, CreateTagsTable1678486383665, CreateCoursesTagsTable1678488840695, AddCoursesIdToeCoursesTagsTable1678489138400, AddTagsIdToeCoursesTagsTable1678489498059]
});