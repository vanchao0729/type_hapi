import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request, ServerRoute } from '@hapi/hapi';
import { initDb } from './db';
import 'colors';
import { get } from 'node-emoji';
import { userController, authController } from './controllers';
import { Connection } from 'typeorm';

const init = async () => {
    const server: Server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path:'/',
        handler: (request: Request, h: ResponseToolkit, err?: Error) => {
            return "Hi";
        },
    });

    const con:Connection = await initDb();
    console.log( get('dvd') , 'DB init -> Done!', get('dvd') );
    server.route([...userController(con), ...authController(con)] as Array<ServerRoute>);
    await server.start().then();
    console.log( get('rocket'), `Server running on ${server.info.uri}` . green, get('rocket') ) ;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit();
});

init();