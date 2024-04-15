import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hike } from './schema/hike.schema';

@Injectable()
export class HikeService {
  constructor(@InjectModel(Hike.name) private hikeModel: Model<Hike>) {}

  findAll() {
    return this.hikeModel.find().exec();
  }

  findOne(id: string) {
    return this.hikeModel.findOne({ _id: id }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} hike`;
  }
}
