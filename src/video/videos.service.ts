import { Task } from '@app/task/entities/task.entity';
import { User } from '@app/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { videoResponseInterface } from './types/videoResponseInterface.types';
import slugify from 'slugify';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>
    ) {}

    async createVideo(currentUser: User, createVideoDto: CreateVideoDto): Promise<Video> {
        const newVideo = new Video()
        Object.assign(newVideo, createVideoDto)
        newVideo.slug = this.slugMaker(newVideo.title)
        newVideo.user = currentUser
        return await this.videoRepository.save(newVideo)      
    }

    videoResponseFormatter(video: Video ): videoResponseInterface {
        return { video: {...video}}
    }

    private slugMaker(title: string): string {
        return slugify(title, {lower: true}) + '-' + ((Math.random() * Math.pow(36,6) | 0).toString(36))
    }
    
    async returnVideo(reqUserID: number, slug: string): Promise<Video> {
        const video = await this.videoRepository.findOne({slug})
        
        if  (!video)
            throw new HttpException('This video does not exist', HttpStatus.NOT_FOUND)


        if (video.user.user_id !== reqUserID)
            throw new HttpException('You do not have access to this video', HttpStatus.FORBIDDEN)
        else {
            return video
        }
    }

    async updateVideo(user: User, updateVideoDto: UpdateVideoDto, slug: string): Promise<Video> {
        const video = await this.videoRepository.findOne({slug})

        if (!video)
            throw new HttpException('This video does not exist', HttpStatus.NOT_FOUND)
        
        if (video.user.user_id !== user.user_id)
            throw new HttpException('You do not have access to this video', HttpStatus.FORBIDDEN)
        Object.assign(video, updateVideoDto)

        video.slug = this.slugMaker(video.title)

        return await this.videoRepository.save(video)
    }

    async deleteVideo(user: User, slug: string): Promise<any> {
        const video = await this.videoRepository.findOne({slug})

        if (!video)
            throw new HttpException('This video does not exist', HttpStatus.NOT_FOUND)

        if (video.user.user_id !== user.user_id)
            throw new HttpException('You do not have access to this video', HttpStatus.FORBIDDEN)

        return await this.videoRepository.delete(video)
    }

}
