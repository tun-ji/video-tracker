import { IsNotEmpty } from "class-validator"
import { Status } from "../types/video.types"

export class CreateVideoDto {

    readonly thumbnail: string

    @IsNotEmpty()
    readonly title: string

    readonly publish_date: Date

    readonly url: string

    readonly status: Status

    readonly channel: string

}
