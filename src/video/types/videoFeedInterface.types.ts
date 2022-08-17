import { Video } from "../entities/video.entity";

export interface VideoFeedInterface {
    videos: Video[],
    videoCount: number
}