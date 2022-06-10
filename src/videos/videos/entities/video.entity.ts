import { type } from "os";
import { TasksModule } from "src/tasks/tasks.module";
import { Task } from "src/tasks/tasks/entities/task.entity";
import { User } from "src/users/users/entities/user.entity";
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
