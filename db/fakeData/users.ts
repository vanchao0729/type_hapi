import { name, internet, date, random } from 'faker';
import { Condition, Connection, Repository } from 'typeorm';
import { UsersEntity, UserType } from '../entites';
import 'colors';
import { get } from 'node-emoji';
import { genSalt, hash } from 'bcrypt';

export const fakeUsers = async ( con: Connection, amount: number = 50 ) => {
    const userRepo: Repository<UsersEntity> = con.getRepository(UsersEntity);
    for (const _ of Array.from({ length:amount })) {
        const firstName = name.firstName();
        const lastName = name.lastName();
        const birthOfDate = date.past();
        const email = internet.email();
        const type: UserType = random.arrayElement(['admin', 'user']);
        const salt = await genSalt();
        const password = await hash('secret', salt);
        const u: Partial<UsersEntity> = new UsersEntity(
            firstName,
            lastName,
            email,
            password,
            salt,
            birthOfDate,
            type,
        );
        await userRepo.save<Partial<UsersEntity>>(u);
    }
    const emoji = get('white_check_mark');
    console.log(emoji, `Created ${amount} users` . magenta.bold, emoji);
};