import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { videoResponseInterface } from './types/videoResponseInterface.types';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async saveVideo(@Body() createVideoDto: CreateVideoDto): Promise<videoResponseInterface> {
    const newVideo = await this.videosService.saveVideo(createVideoDto)
    return this.videosService.videoResponseFormatter(newVideo)
  }
}
