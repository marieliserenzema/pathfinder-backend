import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hike } from './schema/hike.schema';
import { FilterParametersDto } from './dto/filter-parameters.dto';
import { UpdateStarsDto } from './dto/update-stars.dto';

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
    const totalPage = Math.floor((count - 1) / filterParametersDto.limit) + 1;
    const currentPage = Math.ceil(
      (Number(filterParametersDto.skip) + 1) / filterParametersDto.limit,
    );
    const data = await this.hikeModel
      .find(filter)
      .limit(filterParametersDto.limit)
      .skip(filterParametersDto.skip)
      .exec();
    return {
      items: data,
      totalPage: totalPage,
      count: count,
      currentPage: currentPage,
      hasNextPage: currentPage < totalPage,
    };
  }

  public findOne(id: string) {
    return this.hikeModel.findOne({ _id: id }).exec();
  }

  public async updateStars(id: string, updateStarsDto: UpdateStarsDto) {
    const hike = await this.hikeModel.findOne({ _id: id }).exec();

    if (!hike) {
      throw new NotFoundException();
    }

    const divider = updateStarsDto.stars + hike.stars * hike.starIndexes;

    const dividende = hike.starIndexes + 1;

    const newStarsValue = divider / dividende;

    return this.hikeModel
      .findByIdAndUpdate(
        { _id: id },
        { $inc: { starIndexes: 1 }, $set: { stars: newStarsValue } },
        { new: true },
      )
      .exec();
  }

  public async remove(id: string) {
    await this.hikeModel.findOneAndDelete({ _id: id }).exec();
  }
}
