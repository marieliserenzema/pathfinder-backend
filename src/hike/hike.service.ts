import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hike } from './schema/hike.schema';
import { FilterParametersDto } from './dto/filter-parameters.dto';

@Injectable()
export class HikeService {
  constructor(@InjectModel(Hike.name) private hikeModel: Model<Hike>) {}

  public async findAll(filterParametersDto: FilterParametersDto) {
    let filter = {};
    if (filterParametersDto.property && filterParametersDto.value) {
      filter = {
        [`properties.${filterParametersDto.property}`]: {
          $regex: `.*${filterParametersDto.value}.*`,
          $options: 'i',
        },
      };
    }
    const count = await this.hikeModel.countDocuments(filter).exec();
    const total_page = Math.floor((count - 1) / filterParametersDto.limit) + 1;
    const current_page = Math.ceil(
      (Number(filterParametersDto.skip) + 1) / filterParametersDto.limit,
    );
    const data = await this.hikeModel
      .find(filter)
      .limit(filterParametersDto.limit)
      .skip(filterParametersDto.skip)
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
