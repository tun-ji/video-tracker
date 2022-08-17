import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes, Put, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { videoResponseInterface } from './types/videoResponseInterface.types';
import { UserDec } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/guards/auth.guard';
import { User } from '@app/user/entities/user.entity';
import { VideoFeedInterface } from './types/videoFeedInterface.types';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async findAll(@UserDec('user_id') curr_userId: number, @Query() query: any): Promise<VideoFeedInterface>{
    return await this.videosService.returnVideosBy(curr_userId, query)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async createVideo(@UserDec() curr_User: User, @Body('video') createVideoDto: CreateVideoDto): Promise<videoResponseInterface> {
    const newVideo = await this.videosService.createVideo(curr_User, createVideoDto)
    return this.videosService.videoResponseFormatter(newVideo)
  }

  @Get(':slug')
  @UseGuards(AuthGuard)
  async getVideo(@UserDec('user_id') curr_userID: number, @Param('slug') slug: string): Promise<videoResponseInterface> {
    const video = await this.videosService.returnVideo(curr_userID, slug)
    return this.videosService.videoResponseFormatter(video)
  }

  @Put(':slug')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async updateVideo(@UserDec() user: User, @Body('video') updateVideoDto: UpdateVideoDto, @Param('slug') slug: string): Promise<videoResponseInterface> {
    const video = await this.videosService.updateVideo(user, updateVideoDto, slug)
    return await this.videosService.videoResponseFormatter(video)
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteVideo(@UserDec() user: User, @Param('slug') slug: string): Promise<any> {
    return this.videosService.deleteVideo(user, slug)
  }
}