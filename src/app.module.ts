import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { AuthModule } from './modules/auth/auth.module';
import { BoardModule } from './modules/board/board.module';
import { ListModule } from './modules/list/list.module';
import { TaskModule } from './modules/task/task.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    BoardModule,
    ListModule,
    TaskModule,
    NotificationModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
