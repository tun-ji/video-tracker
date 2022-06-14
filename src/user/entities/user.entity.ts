import { Video } from "src/video/entities/video.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    async passwordHashing() {
        this.password = await hash(this.password, 15)
    }

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @OneToMany(type => Video, video => video.user) 
    videos: Video[]
}
