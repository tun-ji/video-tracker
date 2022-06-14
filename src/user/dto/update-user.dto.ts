import { Video } from '@app/video/entities/video.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly lastName: string

    readonly username: string

    readonly password: string 

    readonly videos: Video[]
}
