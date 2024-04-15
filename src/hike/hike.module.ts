import { Module } from '@nestjs/common';
import { HikeService } from './hike.service';
import { HikeController } from './hike.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hike, HikeSchema } from './schema/hike.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hike.name, schema: HikeSchema }]),
  ],
  controllers: [HikeController],
  providers: [HikeService],
})
export class HikeModule {}
