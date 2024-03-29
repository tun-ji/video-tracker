import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { User } from '@app/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
