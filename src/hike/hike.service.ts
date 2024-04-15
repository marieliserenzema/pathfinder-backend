import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hike } from './schema/hike.schema';
import { PaginationParametersDto } from './dto/pagination-parameters.dto';

@Injectable()
export class HikeService {
  constructor(@InjectModel(Hike.name) private hikeModel: Model<Hike>) {}

  public async findAll(paginationParameters: PaginationParametersDto) {
    const count = await this.hikeModel.countDocuments({}).exec();
    const total_page = Math.floor((count - 1) / paginationParameters.limit) + 1;
    const current_page = Math.ceil(
      (Number(paginationParameters.skip) + 1) / paginationParameters.limit,
    );
    const data = await this.hikeModel
      .find()
      .limit(paginationParameters.limit)
      .skip(paginationParameters.skip)
      .exec();
    return {
      data: data,
      total_page: total_page,
      count: count,
      current_page: current_page,
      hasNextPage: current_page < total_page,
    };
  }

  findOne(id: string) {
    return this.hikeModel.findOne({ _id: id }).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} hike`;
  }
}
