import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { UsersEntity, PostsEntity } from './entites';
import { fakeUsers, fakePosts } from './fakeData';
import 'colors';
import { yellow } from 'colors';

export const initDb = async (): Promise<Connection> => {
    const entities = [UsersEntity, PostsEntity];
    const fakeFuns = [fakeUsers, fakePosts];
    const con = await createConnection({
        type: 'better-sqlite3',
        database: './hapi.db',
        entities,
    });
    await con.synchronize(true);
    entities.forEach(entity => console.log(`Created ${entity.name}` . blue));
    console.log('Creating fake data...', yellow.bold);
    for (const fun of fakeFuns) await fun(con);
    return con;
}