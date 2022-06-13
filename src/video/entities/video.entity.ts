import { Status } from "@app/status/entities/status.entity";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'videos'})
export class Video {
    @PrimaryGeneratedColumn()
    vid_id: number;

    @Column()
    thumbnail: string;

    @Column()
    title: string;

    @ManyToOne(() => Status, (status) => status.video)
    status: Status

    @Column()
    publish_date: Date;

    @Column()
    url: string;

    @OneToMany(() => Task, (task) => task.video)
    tasks: Task[]

    @ManyToOne(() => User, (user) => user.videos) 
    user: User;
}   
