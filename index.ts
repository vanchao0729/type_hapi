import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi';
import { initDb } from './db';
import 'colors';
import { get } from 'node-emoji';

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

    await initDb().then( () => console.log( get('dvd') , 'DB init -> Done!', get('dvd') ) );
    await server.start().then( );
    console.log( get('rocket'), `Server running on ${server.info.uri}` . green, get('rocket') ) ;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit();
});

init();