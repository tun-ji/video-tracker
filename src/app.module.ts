import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './task/tasks.module';
import { UsersModule } from './user/users.module';
import { VideosModule } from './video/videos.module';
;

@Module({
  imports: [VideosModule, , UsersModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
