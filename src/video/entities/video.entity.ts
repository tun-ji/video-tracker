import { Sponsor } from "@app/sponsors/entities/sponsor.entity";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../video.types";

@Entity({name: 'videos'})
export class Video {
    @PrimaryGeneratedColumn()
    vid_id: string;

    @Column()
    thumbnail: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: Status, default: Status.Idea})
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
