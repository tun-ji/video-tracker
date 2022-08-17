import { Sponsor } from "@app/sponsors/entities/sponsor.entity";
import { timestamp } from "rxjs";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../types/video.types";

@Entity({name: 'videos'})
export class Video {
    @PrimaryGeneratedColumn()
    vid_id: number;

    @Column({unique: true})
    slug: string;

    @Column()
    thumbnail: string;

    @Column()
    title: string;

    @Column({ type: 'enum', enum: Status, default: Status.Idea})
    status: Status

    @Column()
    publish_date: Date;

    @Column({unique: true})
    url: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    @OneToMany(() => Task, (task) => task.video, {eager: true})
    tasks: Task[]

    @ManyToOne(() => User, (user) => user.videos, {eager: true}) 
    user: User;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }
}   
