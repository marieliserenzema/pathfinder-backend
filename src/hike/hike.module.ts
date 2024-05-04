import { Module } from '@nestjs/common';
import { HikeService } from './hike.service';
import { HikeController } from './hike.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hike, HikeSchema } from './schema/hike.schema';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hike.name, schema: HikeSchema }]),
    UserModule,
  ],
  controllers: [HikeController],
  providers: [HikeService],
  exports: [HikeService],
})
export class HikeModule {}
