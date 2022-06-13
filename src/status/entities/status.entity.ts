import { Video } from "@app/video/entities/video.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'status'})
export class Status {
    @PrimaryGeneratedColumn()
    status_id: number

    @Column()
    status: string

    @OneToMany(()=> Video, (video) => video.status)
    video: Video[]
}
