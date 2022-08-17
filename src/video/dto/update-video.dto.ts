import { Task } from '@app/task/entities/task.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../types/video.types';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
    @IsNotEmpty()
    readonly vid_id: number
    
    readonly thumbnail: string

    @IsNotEmpty()
    readonly title: string

    readonly publish_date: Date

    readonly url: string

    readonly status: Status

    readonly channel: string

    readonly tasks: Task[]
}

