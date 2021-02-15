import { Connection, Repository } from 'typeorm';
import { UsersEntity } from '../../db/entites';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { string, object, date } from '@hapi/joi';
import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi';

export const authController = (con: Connection): Array<ServerRoute> => {
    const userRepo: Repository<UsersEntity> = con.getRepository(UsersEntity);
    return [
        {
            method: 'POST',
            path: '/register',
            async handler({payload}: Request) {
                const {firstName, lastName, email, password, birthOfDate} = payload as Partial<UsersEntity>;
                const salt = await genSalt();
                const hashedPass = await hash(password, salt);
                const u = new UsersEntity(
                    firstName,
                    lastName,
                    email,
                    hashedPass,
                    salt,
                    birthOfDate
                );
                await userRepo.save<Partial<UsersEntity>>(u);
                delete u.password;
                delete u.salt;
                return {
                    ...u,
                    accessToken: sign({...u}, 'getMeFromEnvFile'),
                }
            }
        },
    ];
};
