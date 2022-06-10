import { Video } from "src/video/entities/video.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    task_no: number;

    @Column()
    task: string;

    @ManyToOne(() => Video, (video) => video.tasks)
    video: Video

}
