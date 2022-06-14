import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TasksModule } from '@app/task/tasks.module';
import { UsersModule } from '@app/user/users.module';
import { VideosModule } from '@app/video/videos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SponsorsModule } from './sponsors/sponsors.module';
import ormconfig from './ormconfig';


@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),VideosModule , UsersModule, TasksModule, SponsorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
