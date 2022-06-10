import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { VideosModule } from './videos/videos.module';
import { TasksModule } from './tasks/tasks.module';
import { VideoTrackerModule } from './video-tracker/video-tracker.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [VideoModule, VideosModule, VideoTrackerModule, UsersModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
