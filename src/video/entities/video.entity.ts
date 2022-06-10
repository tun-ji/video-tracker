import { type } from "os";
import { Task } from "src/task/entities/task.entity";
import { TasksModule } from "src/task/tasks.module";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Url } from "url";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    vid_id: number;

    @Column()
    thumbnail: Url;

    @Column()
    title: string;

    @Column()
    status: string;

    @Column()
    publish_date: Date;

    @Column()
    url: Url;

    @OneToMany(() => Task, (task) => task.video)
    tasks: Task[]

    @ManyToOne(type => User, user => user.videos) 
    user: User;
}
