import { Task } from "@app/task/entities/task.entity"
import { Status } from "../video.types"

export class videoResponseInterface {
    video: {
        readonly vid_id: string
    
        readonly thumbnail: string
    
        readonly title: string
    
        readonly status: Status
    
        readonly publish_date: Date
    
        readonly url: string

        readonly tasks: Task[]
    }
}

// export class videoResponseInterface {
//     video: {
//         Video
//     }
// }
