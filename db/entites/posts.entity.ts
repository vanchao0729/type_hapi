import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn }  from 'typeorm';
import { SharedProp } from './sharedProp.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'posts' })
export class PostsEntity extends SharedProp {
    constructor(title: string, body: string, user: UsersEntity) {
        super();
        this.title = title;
        this.body = body;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ name: "user_id", nullable: false })
    userId: number;

    @ManyToOne( () => UsersEntity, (user: UsersEntity) => user.posts )
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;
}
