import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { videoResponseInterface } from './types/videoResponseInterface.types';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>
    ) {}

    async saveVideo(createVideo: CreateVideoDto): Promise<Video> {
        const newVideo = new Video()
        Object.assign(newVideo, createVideo)
        return await this.videoRepository.save(newVideo)      
    }

    videoResponseFormatter(video: Video ): videoResponseInterface {
        return { video: {...video}}
    }
    
}
