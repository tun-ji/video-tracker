import { Task } from "@app/task/entities/task.entity"
import { Status } from "./video.types"

export class videoResponseInterface {
    video: {
        readonly vid_id: number

        readonly slug: string
    
        readonly thumbnail: string
    
        readonly title: string
    
        readonly status: Status
    
        readonly publish_date: Date
    
        readonly url: string

        readonly created_at: Date

        readonly updated_at: Date

        readonly tasks: Task[]
    }
}

