import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { HikeModule } from './hike/hike.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/pathfinder', {
      autoIndex: true,
    }),
    UserModule,
    AuthModule,
    CommentModule,
    HikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
