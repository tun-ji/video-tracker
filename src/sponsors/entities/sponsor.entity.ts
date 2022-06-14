import { Video } from "@app/video/entities/video.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Sponsor {
    @PrimaryGeneratedColumn()
    sponsor_ID: string

    @Column()
    sponsor: string

    // @ManyToMany(() => Video, (video) => video.sponsors)
    // video: Video
}
