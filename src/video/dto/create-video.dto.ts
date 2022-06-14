import { IsNotEmpty } from "class-validator"

export class CreateVideoDto {

    readonly thumbnail: string

    @IsNotEmpty()
    readonly title: string

    readonly publish_date: Date

    readonly url: string

    readonly channel: string
}
